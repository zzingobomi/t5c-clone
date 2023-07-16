import { Scene, UniversalCamera, Vector3 } from "@babylonjs/core";

export class PlayerCamera {
  public camera: UniversalCamera;
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

    //this.camera.attachControl();
    this._scene.activeCamera = this.camera;
  }

  public follow(playerPosition: Vector3, rotationY: number): void {
    // camera must follow player
    let currentPlayer = playerPosition.y;
    // FIXME: ytilt 적용하기
    this.camera.position = new Vector3(0, playerPosition.y + 10, 10);
    this.camera.setTarget(new Vector3(0, 0, 0));
  }
}
