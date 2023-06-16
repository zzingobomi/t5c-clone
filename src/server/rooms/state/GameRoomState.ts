import { Schema, type, MapSchema } from "@colyseus/schema";
import { PlayerSchema } from "../schema/PlayerSchema";
import { GameRoom } from "../GameRoom";
import { Client } from "colyseus";
import Logger from "../../../shared/Logger";

export class GameRoomState extends Schema {
  @type({ map: PlayerSchema }) players = new MapSchema<PlayerSchema>();

  private _gameroom: GameRoom = null;

  constructor(gameroom: GameRoom, ...args: any[]) {
    super(...args);
    this._gameroom = gameroom;
  }

  /**
   * Add Player
   * @param sessionId
   * @param data
   */
  addPlayer(client: Client, AI_MODE = false): void {
    const player = {
      id: 111,
      x: 0,
      y: 0,
      z: 0,
      rot: 0,

      sessionId: client.sessionId,
      type: "player",
      race: "male_adventurer",
    };

    console.log(player);

    this._gameroom.state.players.set(
      client.sessionId,
      new PlayerSchema(this._gameroom, player)
    );

    Logger.info(
      `[gameroom][onJoin] player ${client.sessionId} joined room ${this._gameroom.roomId}.`
    );
  }

  removePlayer(sessionId: string) {
    this.players.delete(sessionId);
  }
}
