import { Scene } from "@babylonjs/core";
import { PlayerCamera } from "./Player/PlayerCamera";

export class Entity {
  public _scene: Scene;

  // controllers
  public cameraController: PlayerCamera;

  constructor(scene: Scene) {
    this._scene = scene;
  }
}
