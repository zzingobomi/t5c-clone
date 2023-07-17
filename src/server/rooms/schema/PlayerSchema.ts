import { Client } from "@colyseus/core";
import { Schema, type } from "@colyseus/schema";
import { GameRoom } from "../GameRoom";
import { MoveCTRL } from "../controllers/MoveCTRL";

export class PlayerSchema extends Schema {
  @type("number") public id: number = 0;
  @type("number") public x: number = 0;
  @type("number") public y: number = 0;
  @type("number") public z: number = 0;
  @type("number") public rot: number = 0;

  @type("string") public sessionId: string;
  @type("string") public name: string = "";
  @type("string") public type: string = "player";
  @type("string") public race: string = "male_adventurer";

  /////////////////////////////////////////////////////////////
  // does not need to be synced
  public speed: number = 0;

  // controllers
  public _gameroom: GameRoom;
  public client: Client;
  public moveCTRL: MoveCTRL;

  // TODO: data type setting
  constructor(gameroom: GameRoom, data: any) {
    super(gameroom, data);

    this._gameroom = gameroom;
    this.client = this.getClient();

    // set controllers
    this.moveCTRL = new MoveCTRL(this);
  }

  public getClient() {
    return this._gameroom.clients.getById(this.sessionId);
  }

  // runs on every server iteration
  update() {
    this.moveCTRL.update();
  }
}
