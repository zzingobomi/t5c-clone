import { AbstractMesh, AssetContainer, Scene } from "@babylonjs/core";
import { PlayerCamera } from "./Player/PlayerCamera";
import { Room } from "colyseus.js";
import { EntityMesh } from "./Entity/EntityMesh";
import { PlayerSchema } from "src/server/rooms/schema/PlayerSchema";
import { EntityMove } from "./Entity/EntityMove";

export class Entity {
  public _scene: Scene;
  public _room: Room;
  public _loadedAssets: AssetContainer[];

  // controllers
  public cameraController: PlayerCamera;
  public moveController: EntityMove;
  public meshController: EntityMesh;

  // entity
  public mesh: AbstractMesh;
  public playerMesh: AbstractMesh;
  public sessionId: string;
  public entity: PlayerSchema;
  public isCurrentPlayer: boolean;

  // character
  public type: string = "";
  public race: string = "";
  public name: string = "";
  public speed: number;
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

    // set entity
    Object.assign(this, this.entity);

    this.spawn(entity);
  }

  public async spawn(entity: PlayerSchema) {
    // load mesh controllers
    this.meshController = new EntityMesh(this);
    await this.meshController.load();
    this.mesh = this.meshController.mesh;
    this.playerMesh = this.meshController.playerMesh;

    // add all entity related stuff
    this.moveController = new EntityMove(this.mesh, this.speed);
    this.moveController.setPositionAndRotation(entity);

    ///////////////////////////////////////////////////////////
    // entity network event
    // colyseus automatically sends entity updates, so let's listen to those changes
    this.entity.onChange(() => {
      // make sure players are always visible
      this.mesh.isVisible = true;

      // update player data from server data
      Object.assign(this, this.entity);

      // update player position
      this.moveController.setPositionAndRotation(this.entity);
    });
  }

  public update(delta) {
    // tween entity
    if (this && this.moveController) {
      this.moveController.tween();
    }
  }

  public updateServerRate(delta) {}
}
