import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireCurrentUserId, unauthorizedJsonResponse, ensureAppUser } from "@/lib/current-user";
import { GoogleGenerativeAI, SchemaType, FunctionDeclaration } from "@google/generative-ai";
import axios from "axios";

// Gemini Model Configuration
const GEMINI_MODEL = "gemini-2.5-flash";

// ─── Gemini Tool Declarations ────────────────────────────────────────────────
const createPlayerGroupTool: FunctionDeclaration = {
  name: "createPlayerGroup",
  description: "Create a new player group (e.g. 'Potential Threats', 'Friendly') with an optional color.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      name: {
        type: SchemaType.STRING,
        description: "The name of the new group.",
      },
      color: {
        type: SchemaType.STRING,
        description: "Optional hex color code (e.g., '#ef4444' or '#10b981').",
      },
    },
    required: ["name"],
  },
};

const assignPlayerToGroupTool: FunctionDeclaration = {
  name: "assignPlayerToGroup",
  description: "Assign a specific player to a group or remove them from their current group.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      playerId: {
        type: SchemaType.STRING,
        description: "The Steam/BattleMetrics ID of the player.",
      },
      groupId: {
        type: SchemaType.STRING,
        description: "The ID of the group to assign. Pass null or an empty string to remove the player from all groups.",
      },
    },
    required: ["playerId"],
  },
};

const trackNewServerTool: FunctionDeclaration = {
  name: "trackNewServer",
  description: "Track a new Rust server using its BattleMetrics server ID.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      serverId: {
        type: SchemaType.STRING,
        description: "The BattleMetrics numerical ID of the server.",
      },
    },
    required: ["serverId"],
  },
};

const trackNewPlayerTool: FunctionDeclaration = {
  name: "trackNewPlayer",
  description: "Track a new player on a specific server by their player ID.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      playerId: {
        type: SchemaType.STRING,
        description: "The Steam/BattleMetrics ID of the player.",
      },
      serverId: {
        type: SchemaType.STRING,
        description: "The BattleMetrics ID of the server they play on.",
      },
      name: {
        type: SchemaType.STRING,
        description: "Optional name of the player.",
      },
    },
    required: ["playerId", "serverId"],
  },
};

const getLiveOnlinePlayersTool: FunctionDeclaration = {
  name: "getLiveOnlinePlayers",
  description: "Fetch the list of live players currently online on a specific tracked server.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      serverId: {
        type: SchemaType.STRING,
        description: "The BattleMetrics ID of the server.",
      },
    },
    required: ["serverId"],
  },
};

// ─── GET: Retrieve Chat Session History ──────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id } = await params;

  try {
    const dbMessages = await prisma.chatMessage.findMany({
      where: { userId, playerId: id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      dbMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }))
    );
  } catch (error: any) {
    console.error("Error retrieving chat history:", error);
    return NextResponse.json({ error: "Failed to load chat history" }, { status: 500 });
  }
}

// ─── POST: Send message, invoke Gemini model and tools ───────────────────────
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id } = await params;
  const body = await req.json();
  const { message } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message content is required" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured on this server. Please add GEMINI_API_KEY to your environment." },
      { status: 501 }
    );
  }

  try {
    // ─── Save User Message to Database ───────────────────────────────────────
    await prisma.chatMessage.create({
      data: {
        userId,
        playerId: id,
        role: "user",
        content: message,
      },
    });

    // ─── Fetch Player Context Data ───────────────────────────────────────────
    const player = await prisma.player.findUnique({
      where: { userId_id: { userId, id } },
      include: {
        group: true,
        server: true,
      },
    });

    if (!player) {
      return NextResponse.json({ error: "Player profile not found" }, { status: 404 });
    }

    const [hourlyStats, sessions, groups, servers, dbMessages] = await Promise.all([
      prisma.playerHourlyStat.findMany({
        where: { userId, playerId: id },
        orderBy: { hour: "asc" },
      }),
      prisma.session.findMany({
        where: { userId, playerId: id },
        orderBy: { joinedAt: "desc" },
        take: 30,
      }),
      prisma.playerGroup.findMany({
        where: { userId },
      }),
      prisma.server.findMany({
        where: { userId },
      }),
      prisma.chatMessage.findMany({
        where: { userId, playerId: id },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    // Construct player pattern context
    const contextString = `
Current Target Player Intel:
- Name: ${player.name}
- Steam/BattleMetrics ID: ${player.id}
- Server Name: ${player.server.name} (Server ID: ${player.serverId})
- Tracking Status: ${player.isTracking ? "Active" : "Inactive"}
- Current Group: ${player.group ? `${player.group.name} (ID: ${player.group.id})` : "None (Ungrouped)"}
- First Seen: ${player.firstSeen.toISOString()}
- Last Seen: ${player.lastSeen.toISOString()}

Hourly Playtime Heatmap (Total Tracked Hours in UTC):
${hourlyStats.map(h => `- Hour ${String(h.hour).padStart(2, '0')}:00: ${(h.totalTimeSec / 3600).toFixed(1)}h`).join("\n")}

Recent Session Logs (Last 30):
${sessions.map(s => `- Joined: ${s.joinedAt.toISOString()}, Left: ${s.leftAt ? s.leftAt.toISOString() : "Active Now"}, Duration: ${s.durationSec ? (s.durationSec / 60).toFixed(1) + "m" : "Active"}`).join("\n")}

System Information:
- Current Local Server Time: ${new Date().toLocaleString()}
- All Available Target Groups: [${groups.map(g => `{"id": "${g.id}", "name": "${g.name}", "color": "${g.color || ''}"}`).join(", ")}]
- All Tracked Servers: [${servers.map(s => `{"id": "${s.id}", "name": "${s.name}"}`).join(", ")}]
`;

    // ─── Initialize Gemini Client ────────────────────────────────────────────
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: `You are an elite, tactical Rust Player Intelligence Assistant.
You analyze player playtime history, session logs, and online metrics to provide strategic insights for players (such as identifying sleep schedules to recommend optimal offline raid windows).
You also interact directly with the player intelligence database using tool calling to organize groups, track players/servers, and monitor live activity.

Always base your raid analysis on the provided Hourly Playtime Heatmap and Session logs. Look for consistent gaps of consecutive offline hours (usually overnight) to suggest raid windows.
When the user asks you to perform database actions, call the corresponding tools. Once the tools return, summarize the result and state clearly what database actions were performed. Keep your answers brief, action-oriented, and structured.`,
      tools: [
        {
          functionDeclarations: [
            createPlayerGroupTool,
            assignPlayerToGroupTool,
            trackNewServerTool,
            trackNewPlayerTool,
            getLiveOnlinePlayersTool,
          ],
        },
      ],
    });

    // ─── Function Call Executors ─────────────────────────────────────────────
    const executeToolCall = async (name: string, args: any) => {
      console.log(`[Gemini Tool Call] Executing: ${name}`, args);
      try {
        switch (name) {
          case "createPlayerGroup": {
            const groupId = crypto.randomUUID();
            const group = await prisma.playerGroup.create({
              data: {
                id: groupId,
                userId,
                name: args.name,
                color: args.color || null,
              },
            });
            return { success: true, message: `Group '${group.name}' successfully created with ID ${group.id}`, group };
          }
          case "assignPlayerToGroup": {
            const targetGroupId = args.groupId || null;
            const updated = await prisma.player.update({
              where: { userId_id: { userId, id: args.playerId } },
              data: { groupId: targetGroupId },
            });
            return { success: true, message: `Player '${updated.name}' updated. Assigned to Group: ${targetGroupId || 'None'}`, player: updated };
          }
          case "trackNewServer": {
            const serverId = args.serverId;
            const existing = await prisma.server.findUnique({
              where: { userId_id: { userId, id: serverId } },
            });
            if (existing) {
              return { success: false, message: `Server '${existing.name}' is already tracked.` };
            }

            let name = `Rust Server ${serverId}`;
            try {
              const headers: Record<string, string> = {};
              if (process.env.BATTLEMETRICS_TOKEN) {
                headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
              }
              const { data } = await axios.get(`https://api.battlemetrics.com/servers/${serverId}`, { headers, timeout: 5000 });
              if (data?.data?.attributes?.name) {
                name = data.data.attributes.name;
              }
            } catch (err) {
              console.error(`Failed to fetch server name in Gemini tool: ${serverId}`, err);
            }

            await ensureAppUser(userId);
            const server = await prisma.server.create({
              data: { userId, id: serverId, name },
            });
            return { success: true, message: `Successfully added server '${server.name}' (ID: ${server.id}) to tracking.`, server };
          }
          case "trackNewPlayer": {
            const { playerId, serverId } = args;
            const existing = await prisma.player.findUnique({
              where: { userId_id: { userId, id: playerId } },
            });
            if (existing && existing.isTracking) {
              return { success: false, message: `Player '${existing.name}' is already tracked.` };
            }

            const server = await prisma.server.findUnique({
              where: { userId_id: { userId, id: serverId } },
            });
            if (!server) {
              return { success: false, message: `Server (ID: ${serverId}) must be tracked first before adding players.` };
            }

            let playerName = args.name || `Unknown Player ${playerId}`;
            if (!args.name) {
              try {
                const headers: Record<string, string> = {};
                if (process.env.BATTLEMETRICS_TOKEN) {
                  headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
                }
                const { data } = await axios.get(`https://api.battlemetrics.com/players/${playerId}`, { headers, timeout: 5000 });
                if (data?.data?.attributes?.name) {
                  playerName = data.data.attributes.name;
                }
              } catch (err) {
                console.error(`Failed to fetch player name in Gemini tool: ${playerId}`, err);
              }
            }

            await ensureAppUser(userId);
            const player = await prisma.player.upsert({
              where: { userId_id: { userId, id: playerId } },
              create: {
                userId,
                id: playerId,
                name: playerName,
                serverId,
                firstSeen: new Date(),
                lastSeen: new Date(),
              },
              update: {
                isTracking: true,
                serverId,
              },
            });
            return { success: true, message: `Player '${player.name}' (ID: ${player.id}) is now tracked.`, player };
          }
          case "getLiveOnlinePlayers": {
            const serverId = args.serverId;
            const headers: Record<string, string> = {};
            if (process.env.BATTLEMETRICS_TOKEN) {
              headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
            }
            const { data } = await axios.get(`https://api.battlemetrics.com/servers/${serverId}?include=player`, { headers, timeout: 5000 });
            const included = data.included || [];
            const players = included
              .filter((inc: any) => inc.type === "player")
              .map((p: any) => ({ id: p.id, name: p.attributes?.name || "Unknown" }));
            return { success: true, count: players.length, players: players.slice(0, 15), message: `Retrieved online players. Currently ${players.length} players online.` };
          }
          default:
            return { error: `Tool ${name} not found.` };
        }
      } catch (err: any) {
        console.error(`Error executing tool ${name}:`, err);
        return { error: `Failed to execute action: ${err.message}` };
      }
    };

    // ─── Chat Thread Loop ────────────────────────────────────────────────────
    // Translate database messages (excluding the last one which is user's active query) into Gemini history
    const rawHistory = dbMessages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Ensure the history strictly starts with a 'user' message as required by Gemini
    const firstUserIndex = rawHistory.findIndex((m) => m.role === "user");
    const chatHistory = firstUserIndex !== -1 ? rawHistory.slice(firstUserIndex) : [];

    const lastUserMessageText = dbMessages[dbMessages.length - 1].content;
    
    // Inject Target Context into the first message to bootstrap target awareness
    const contextualMessage = `[TARGET CONTEXT]
${contextString}
[/TARGET CONTEXT]

User query: ${lastUserMessageText}`;

    const chat = model.startChat({
      history: chatHistory,
    });

    let result = await chat.sendMessage(contextualMessage);
    let response = result.response;
    let functionCalls = response.functionCalls();

    // Loop handles multiple rounds of function calls if predicted by Gemini
    let safetyCounter = 0;
    while (functionCalls && functionCalls.length > 0 && safetyCounter < 5) {
      safetyCounter++;
      const functionResponses = [];

      for (const call of functionCalls) {
        const toolResult = await executeToolCall(call.name, call.args);
        functionResponses.push({
          functionResponse: {
            name: call.name,
            response: toolResult,
          },
        });
      }

      const nextResult = await chat.sendMessage(functionResponses);
      response = nextResult.response;
      functionCalls = response.functionCalls();
    }

    const responseText = response.text();

    // ─── Save Gemini Message to Database ─────────────────────────────────────
    await prisma.chatMessage.create({
      data: {
        userId,
        playerId: id,
        role: "model",
        content: responseText,
      },
    });

    return NextResponse.json({
      role: "model",
      content: responseText,
    });

  } catch (error: any) {
    console.error("Gemini Chat API error:", error);
    return NextResponse.json({ error: error.message || "Failed to process chat" }, { status: 500 });
  }
}

// ─── DELETE: Clear Chat History ──────────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id } = await params;

  try {
    await prisma.chatMessage.deleteMany({
      where: { userId, playerId: id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error clearing chat history:", error);
    return NextResponse.json({ error: "Failed to clear chat history" }, { status: 500 });
  }
}
