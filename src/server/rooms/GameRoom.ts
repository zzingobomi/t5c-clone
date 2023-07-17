import { Client, Room } from "@colyseus/core";
import { GameRoomState } from "./state/GameRoomState";
import { PlayerInputs } from "../../shared/types";
import Logger from "../../shared/Logger";
import Config from "../../shared/Config";
import { PlayerSchema } from "./schema/PlayerSchema";

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

    // Register message handlers for messages from the client
    this.registerMessageHandlers();

    // Set the frequency of the patch rate
    this.setPatchRate(Config.updateRate);

    // Set the simulation interval callback use to check stuff on the server at regular interval
    this.setSimulationInterval((dt: number) => {
      this.state.update(dt);
    }, Config.updateRate);

    // set max cllients
    this.maxClients = Config.maxClients;
  }

  async onJoin(client: Client, options: any) {
    this.state.addPlayer(client);
  }

  private registerMessageHandlers() {
    this.onMessage("playerInput", (client, playerInput: PlayerInputs) => {
      const playerState: PlayerSchema = this.state.players.get(
        client.sessionId
      );
      if (playerState) {
        playerState.moveCTRL.processPlayerInput(playerInput);
      } else {
        console.error(
          `Failed to retrieve Player State for ${client.sessionId}`
        );
      }
    });
  }

  async onLeave(client: Client, consented: boolean) {
    // colyseus client leave
    client.leave();

    Logger.info(`[onLeave] player TODO:name left`);
  }

  onDispose() {}
}
