import { AbstractMesh, AssetContainer, Scene } from "@babylonjs/core";
import { PlayerCamera } from "./Player/PlayerCamera";
import { Room } from "colyseus.js";
import { EntityMesh } from "./Entity/EntityMesh";
import { PlayerSchema } from "src/server/rooms/schema/PlayerSchema";

export class Entity {
  public _scene: Scene;
  public _room: Room;
  public _loadedAssets: AssetContainer[];

  // controllers
  public cameraController: PlayerCamera;
  public meshController: EntityMesh;

  // entity
  public mesh: AbstractMesh;
  public playerMesh: AbstractMesh;
  public sessionId: string;
  public entity;
  public isCurrentPlayer: boolean;

  // character
  public type: string = "";
  public race: string = "";
  public name: string = "";
  public x: number;
  public y: number;
  public z: number;

  constructor(
    entity: PlayerSchema,
    room: Room,
    scene: Scene,
    _loadedAssets: AssetContainer[]
  ) {
    // setup class variables
    this._scene = scene;
    this._room = room;
    this._loadedAssets = _loadedAssets;
    this.sessionId = entity.sessionId;
    this.isCurrentPlayer = this._room.sessionId === entity.sessionId;
    this.entity = entity;
    this.type = "entity";

    // FIXME: update player data from server data
    this.race = "male_adventurer";

    this.spawn(entity);
  }

  public async spawn(entity: PlayerSchema) {
    // load mesh controllers
    this.meshController = new EntityMesh(this);
    await this.meshController.load();
    this.mesh = this.meshController.mesh;
  }
}
