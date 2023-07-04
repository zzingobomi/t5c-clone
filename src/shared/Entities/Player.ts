import { Scene } from "@babylonjs/core";
import { Entity } from "./Entity";
import { PlayerCamera } from "./Player/PlayerCamera";
import { PlayerSchema } from "../../server/rooms/schema/PlayerSchema";
import { Room } from "colyseus.js";

export class Player extends Entity {
  constructor(
    entity: PlayerSchema,
    room: Room,
    scene: Scene,
    _loadedAssets: any[]
  ) {
    super(entity, room, scene, _loadedAssets);

    this.type = "player";

    this.spawnPlayer();
  }

  private async spawnPlayer() {
    this.cameraController = new PlayerCamera(this._scene);

    //////////////////////////////////////////////////////////////////////////
    // player before render loop
    //////////////////////////////////////////////////////////////////////////
    this._scene.registerBeforeRender(() => {
      // move camera as player moves
      this.cameraController.follow(this.mesh.position, this.mesh.rotation.y);
    });
  }
}
