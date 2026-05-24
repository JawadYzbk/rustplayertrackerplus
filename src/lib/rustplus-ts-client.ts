import RustPlus from "@liamcottle/rustplus.js";
import WebSocket from "ws";
import { rustplus } from "../generated/rustplus";

export class RustPlusTS extends RustPlus {
  websocket: any;
  AppRequest: any;
  AppMessage: any;
  seqCallbacks: any[];
  reconnectAttempts: number = 0;
  maxReconnectDelay: number = 30000;
  isExplicitlyClosed: boolean = false;

  constructor(
    server: string,
    port: string,
    playerId: string,
    playerToken: string,
    useFacepunchProxy = false
  ) {
    super(server, port, playerId, playerToken, useFacepunchProxy);
    this.seqCallbacks = [];
  }

  override disconnect(): void {
    this.isExplicitlyClosed = true;
    if (this.websocket) {
      this.websocket.terminate(); // Force close
    }
    super.disconnect();
  }

  override connect(): void {
    this.isExplicitlyClosed = false;
    // make sure existing connection is disconnected before connecting again.
    if (this.websocket) {
      try {
        this.websocket.terminate();
      } catch {
        // ignore
      }
    }

    // load static proto types directly from compiled TS module, completely bypassing dynamic loading!
    this.AppRequest = rustplus.AppRequest;
    this.AppMessage = rustplus.AppMessage;

    // fire event as we are connecting
    this.emit("connecting");

    // connect to websocket
    const address = this.useFacepunchProxy
      ? `wss://companion-rust.facepunch.com/game/${this.server}/${this.port}`
      : `ws://${this.server}:${this.port}`;
    
    this.websocket = new WebSocket(address);

    // fire event when connected
    this.websocket.on("open", () => {
      this.reconnectAttempts = 0;
      this.emit("connected");
    });

    // fire event for websocket errors
    this.websocket.on("error", (e: any) => {
      this.emit("error", e);
    });

    this.websocket.on("message", (data: any) => {
      try {
        // decode received message using compiled decoder
        // ensure data is a Uint8Array for better compatibility with protobufjs
        const message = this.AppMessage.decode(new Uint8Array(data));

        // check if received message is a response and if we have a callback registered for it
        if (
          message.response &&
          message.response.seq &&
          this.seqCallbacks[message.response.seq]
        ) {
          // get the callback for the response sequence
          const callback = this.seqCallbacks[message.response.seq];

          // call the callback with the response message
          const result = callback(message);

          // remove the callback
          delete this.seqCallbacks[message.response.seq];

          // if callback returns true, don't fire message event
          if (result) {
            return;
          }
        }

        // fire message event for received messages that aren't handled by callback
        this.emit("message", message);
      } catch (error) {
        this.emit("error", error);
      }
    });

    // fire event when disconnected
    this.websocket.on("close", () => {
      this.emit("disconnected");
      
      if (!this.isExplicitlyClosed) {
        const delay = Math.min(
          Math.pow(2, this.reconnectAttempts) * 1000,
          this.maxReconnectDelay
        );
        this.reconnectAttempts++;
        console.log(`[RustPlusTS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})...`);
        setTimeout(() => this.connect(), delay);
      }
    });
  }
}

export default RustPlusTS;
