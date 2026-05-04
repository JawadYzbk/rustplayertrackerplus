/**
 * fcm-listener.js
 * 
 * Runs as a child process spawned by Next.js API route.
 * Receives credentials via stdin JSON, emits events via stdout JSON.
 * 
 * Communicates via newline-delimited JSON (NDJSON):
 *   stdin:  { androidId, securityToken }
 *   stdout: { type: "log"|"pairing"|"error"|"connected"|"stopped", ... }
 */

'use strict';

const Client = require('@liamcottle/push-receiver/src/client');

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

function extractServerPairing(value) {
  if (!value || typeof value !== 'object') return null;
  const obj = value;
  const isServerPair =
    obj.type === 'server' &&
    typeof obj.ip === 'string' &&
    (typeof obj.port === 'string' || typeof obj.port === 'number') &&
    typeof obj.playerId === 'string' &&
    typeof obj.playerToken === 'string' &&
    typeof obj.id === 'string';

  if (isServerPair) return obj;

  for (const nested of Object.values(obj)) {
    const found = extractServerPairing(nested);
    if (found) return found;
  }
  return null;
}

let rawInput = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  rawInput += chunk;
});

process.stdin.on('end', async () => {
  let credentials;
  try {
    credentials = JSON.parse(rawInput.trim());
  } catch (err) {
    send({ type: 'error', message: 'Invalid credentials JSON: ' + err.message });
    process.exit(1);
    return;
  }

  const { androidId, securityToken, listenMs = 120000 } = credentials;

  if (!androidId || !securityToken) {
    send({ type: 'error', message: 'Missing androidId or securityToken' });
    process.exit(1);
    return;
  }

  send({ type: 'log', level: 'info', message: `Connecting to FCM with ID ${String(androidId).substring(0, 8)}...` });

  try {
    const client = new Client(androidId, securityToken, []);

    const timer = setTimeout(() => {
      send({ type: 'stopped', reason: 'timeout' });
      try { client.destroy(); } catch {}
      process.exit(0);
    }, listenMs);

    client.on('ON_DATA_RECEIVED', (data) => {
      send({ type: 'log', level: 'info', message: 'Push notification received.' });
      const pairing = extractServerPairing(data);
      if (pairing) {
        send({ type: 'pairing', pairing });
        clearTimeout(timer);
        try { client.destroy(); } catch {}
        process.exit(0);
      } else {
        send({ type: 'log', level: 'warn', message: 'Notification received but no server pairing found.' });
      }
    });

    send({ type: 'log', level: 'info', message: 'FCM Socket connecting...' });
    await client.connect();
    send({ type: 'connected', message: 'FCM Socket connected and listening.' });

  } catch (err) {
    send({ type: 'error', message: err.message || 'FCM client error' });
    process.exit(1);
  }
});
