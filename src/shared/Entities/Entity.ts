import { AbstractMesh, AssetContainer, Scene } from "@babylonjs/core";
import { PlayerCamera } from "./Player/PlayerCamera";
import { Room } from "colyseus.js";
import { EntityMesh } from "./Entity/EntityMesh";

export class Entity {
  public _scene: Scene;
  public _room: Room;
  public _loadedAssets;

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
  public x: number;
  public y: number;
  public z: number;

  constructor(
    entity,
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

    this.spawn(entity);
  }

  public async spawn(entity) {
    // load mesh controllers
    this.meshController = new EntityMesh(this);
    await this.meshController.load();
  }
}
