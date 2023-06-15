import { Scene } from "@babylonjs/core";
import { Entity } from "./Entity";
import { PlayerCamera } from "./Player/PlayerCamera";

export class Player extends Entity {
  constructor(scene: Scene) {
    super(scene);

    this.spawnPlayer();
  }

  private async spawnPlayer() {
    this.cameraController = new PlayerCamera(this._scene);
  }
}
