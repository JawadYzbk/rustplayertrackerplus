declare module "@liamcottle/push-receiver/src/android/fcm" {
  export function register(
    apiKey: string,
    projectId: string,
    gcmSenderId: string,
    gmsAppId: string,
    androidPackageName: string,
    androidPackageCert: string
  ): Promise<{
    fcm: { token: string };
    gcm: { androidId: string; securityToken: string };
  }>;
}

declare module "@liamcottle/push-receiver/src/client" {
  export default class PushReceiverClient {
    constructor(androidId: string, securityToken: string, appIds: string[]);
    on(event: "ON_DATA_RECEIVED", listener: (data: unknown) => void): void;
    connect(): Promise<void>;
    destroy(): void;
  }
}

declare module "@liamcottle/rustplus.js" {
  export default class RustPlus {
    constructor(
      server: string,
      port: string,
      playerId: string,
      playerToken: string,
      useFacepunchProxy?: boolean
    );
    on(
      event: "connected" | "disconnected" | "error",
      listener: (error?: unknown) => void
    ): void;
    connect(): void;
    disconnect(): void;
    sendTeamMessage(message: string): void;
  }
}
