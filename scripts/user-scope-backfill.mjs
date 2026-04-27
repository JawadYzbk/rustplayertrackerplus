import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";

const [, , mode, ...args] = process.argv;

function usage() {
  console.error(
    [
      "Usage:",
      "  node scripts/user-scope-backfill.mjs export <userId> [backupPath]",
      "  node scripts/user-scope-backfill.mjs import <backupPath>",
    ].join("\n")
  );
  process.exit(1);
}

function getDefaultBackupPath(userId) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(process.cwd(), "prisma", "backups", `${stamp}-${userId}.json`);
}

async function createClient() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  return client;
}

async function exportLegacyData(userId, backupPath) {
  const client = await createClient();

  try {
    const servers = await client.query('SELECT * FROM "Server" ORDER BY "createdAt", id');
    const players = await client.query('SELECT * FROM "Player" ORDER BY "firstSeen", id');
    const sessions = await client.query('SELECT * FROM "Session" ORDER BY id');
    const dailyStats = await client.query('SELECT * FROM "PlayerDailyStat" ORDER BY id');
    const hourlyStats = await client.query('SELECT * FROM "PlayerHourlyStat" ORDER BY id');

    const payload = {
      exportedAt: new Date().toISOString(),
      targetUserId: userId,
      counts: {
        servers: servers.rowCount,
        players: players.rowCount,
        sessions: sessions.rowCount,
        dailyStats: dailyStats.rowCount,
        hourlyStats: hourlyStats.rowCount,
      },
      data: {
        servers: servers.rows,
        players: players.rows,
        sessions: sessions.rows,
        dailyStats: dailyStats.rows,
        hourlyStats: hourlyStats.rows,
      },
    };

    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.writeFile(backupPath, JSON.stringify(payload, null, 2));

    console.log(`Backup written to ${backupPath}`);
    console.log(JSON.stringify(payload.counts, null, 2));
  } finally {
    await client.end();
  }
}

async function importScopedData(backupPath) {
  const raw = await fs.readFile(backupPath, "utf8");
  const payload = JSON.parse(raw);
  const userId = payload.targetUserId;
  const client = await createClient();

  try {
    await client.query("BEGIN");

    await client.query(
      'INSERT INTO "AppUser" (id, "createdAt") VALUES ($1, NOW()) ON CONFLICT (id) DO NOTHING',
      [userId]
    );

    for (const server of payload.data.servers) {
      await client.query(
        'INSERT INTO "Server" ("userId", id, name, "createdAt") VALUES ($1, $2, $3, $4)',
        [userId, server.id, server.name, server.createdAt]
      );
    }

    for (const player of payload.data.players) {
      await client.query(
        [
          'INSERT INTO "Player" ("userId", id, name, "serverId", "firstSeen", "lastSeen")',
          "VALUES ($1, $2, $3, $4, $5, $6)",
        ].join(" "),
        [userId, player.id, player.name, player.serverId, player.firstSeen, player.lastSeen]
      );
    }

    for (const session of payload.data.sessions) {
      await client.query(
        [
          'INSERT INTO "Session" (id, "userId", "playerId", "serverId", "joinedAt", "leftAt", "durationSec")',
          "VALUES ($1, $2, $3, $4, $5, $6, $7)",
        ].join(" "),
        [
          session.id,
          userId,
          session.playerId,
          session.serverId,
          session.joinedAt,
          session.leftAt,
          session.durationSec,
        ]
      );
    }

    for (const stat of payload.data.dailyStats) {
      await client.query(
        [
          'INSERT INTO "PlayerDailyStat" (id, "userId", "playerId", date, "totalTimeSec", "sessionsCount")',
          "VALUES ($1, $2, $3, $4, $5, $6)",
        ].join(" "),
        [stat.id, userId, stat.playerId, stat.date, stat.totalTimeSec, stat.sessionsCount]
      );
    }

    for (const stat of payload.data.hourlyStats) {
      await client.query(
        [
          'INSERT INTO "PlayerHourlyStat" (id, "userId", "playerId", hour, "totalTimeSec")',
          "VALUES ($1, $2, $3, $4, $5)",
        ].join(" "),
        [stat.id, userId, stat.playerId, stat.hour, stat.totalTimeSec]
      );
    }

    await client.query(
      [
        `SELECT setval(pg_get_serial_sequence('"Session"', 'id'),`,
        `COALESCE((SELECT MAX(id) FROM "Session"), 1), true)`,
      ].join(" ")
    );
    await client.query(
      [
        `SELECT setval(pg_get_serial_sequence('"PlayerDailyStat"', 'id'),`,
        `COALESCE((SELECT MAX(id) FROM "PlayerDailyStat"), 1), true)`,
      ].join(" ")
    );
    await client.query(
      [
        `SELECT setval(pg_get_serial_sequence('"PlayerHourlyStat"', 'id'),`,
        `COALESCE((SELECT MAX(id) FROM "PlayerHourlyStat"), 1), true)`,
      ].join(" ")
    );

    await client.query("COMMIT");

    console.log(`Imported scoped data for ${userId}`);
    console.log(JSON.stringify(payload.counts, null, 2));
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

if (mode === "export") {
  const [userId, customBackupPath] = args;
  if (!userId) usage();
  await exportLegacyData(userId, customBackupPath || getDefaultBackupPath(userId));
} else if (mode === "import") {
  const [backupPath] = args;
  if (!backupPath) usage();
  await importScopedData(path.resolve(process.cwd(), backupPath));
} else {
  usage();
}
