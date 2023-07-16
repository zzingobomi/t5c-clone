import { Schema, type } from "@colyseus/schema";
import { GameRoom } from "../GameRoom";

export class PlayerSchema extends Schema {
  @type("number") public id: number = 0;
  @type("number") public x: number = 0;
  @type("number") public y: number = 0;
  @type("number") public z: number = 0;
  @type("number") public rot: number = 0;

  @type("string") public sessionId: string;
  @type("string") public name: string = "";
  @type("string") public type: string = "player";
  @type("string") public race: string = "player_hobbit";

  // controllers
  public _gameroom;
  public client;

  constructor(gameroom: GameRoom, data) {
    super(gameroom, data);

    this._gameroom = gameroom;
  }
}
