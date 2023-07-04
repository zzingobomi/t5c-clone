import { Scene, UniversalCamera, Vector3 } from "@babylonjs/core";

export class PlayerCamera {
  public camera;
  private _scene: Scene;

  constructor(scene: Scene) {
    this._scene = scene;
    this._build();
  }

  private _build() {
    this.camera = new UniversalCamera(
      "cam",
      new Vector3(0, 0, -45),
      this._scene
    );

    this._scene.activeCamera = this.camera;
  }

  public follow(playerPosition, rotationY): void {
    // TODO: Camera follow
  }
}
