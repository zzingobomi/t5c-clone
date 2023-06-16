import { Client, Room } from "@colyseus/core";
import { GameRoomState } from "./state/GameRoomState";
import Logger from "../../shared/Logger";
import Config from "../../shared/Config";

export class GameRoom extends Room<GameRoomState> {
  public maxClients = 64;
  public autoDispose = false;

  async onCreate(options: any) {
    Logger.info(
      `[gameroom][onCreate] game room created: ${this.roomId} ${options}}`
    );

    this.setMetadata(options);

    // Set initial state
    this.setState(new GameRoomState(this, options));

    // set max cllients
    this.maxClients = Config.maxClients;
  }

  async onJoin(client: Client, options: any) {
    this.state.addPlayer(client);
  }

  async onLeave(client: Client, consented: boolean) {
    // colyseus client leave
    client.leave();

    Logger.info(`[onLeave] player TODO:name left`);
  }

  onDispose() {}
}
