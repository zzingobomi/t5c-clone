import {
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
  MeshBuilder,
  PositionGizmo,
  GizmoManager,
  FreeCamera,
} from "@babylonjs/core";

export class PlayerCamera {
  public camera: UniversalCamera;
  private _scene: Scene;
  public _camRoot: TransformNode;

  public debugCamera: FreeCamera;

  constructor(scene: Scene) {
    this._scene = scene;
    this._build();
  }

  private _build() {
    this._camRoot = new TransformNode("root");
    this._camRoot.position = new Vector3(0, 1.5, 0);

    // to face the player from behind (180 degrees)
    this._camRoot.rotation = new Vector3(0, (3 / 4) * Math.PI, 0);

    // rotations along the x-axis (up/down tilting)
    const yTilt = new TransformNode("ytilt");
    yTilt.rotation = new Vector3(0.6, 0, 0);
    yTilt.parent = this._camRoot;

    this.camera = new UniversalCamera(
      "cam",
      new Vector3(0, 0, -45),
      this._scene
    );
    this.camera.lockedTarget = this._camRoot.position;
    this.camera.fov = 0.35;
    this.camera.parent = yTilt;

    this._scene.activeCamera = this.camera;

    // TODO: Debug Camera change
    // this.debugCamera = new FreeCamera("debugCamera", new Vector3(0, 10, 10));
    // this.debugCamera.attachControl();
    // this.debugCamera.speed = 0.5;
    // this._scene.activeCamera = this.debugCamera;

    // const gizmoCamRoot = new PositionGizmo();
    // gizmoCamRoot.scaleRatio = 0.2;
    // gizmoCamRoot.attachedNode = this._camRoot;

    // const gizmoYtilt = new PositionGizmo();
    // gizmoYtilt.scaleRatio = 0.5;
    // gizmoYtilt.attachedNode = yTilt;
  }

  // TODO: 왜 카메라가 따라가야지만 찍은 좌표로 정상적으로 가지?
  public follow(playerPosition: Vector3, rotationY: number) {
    // camera must follow player
    let centerPlayer = playerPosition.y;
    this._camRoot.position = Vector3.Lerp(
      this._camRoot.position,
      new Vector3(playerPosition.x, centerPlayer, playerPosition.z),
      0.4
    );
  }

  public zoom(deltaY: number) {
    if (deltaY > 0 && this.camera.position.z > -50) this.camera.position.z -= 1;
    if (deltaY < 0 && this.camera.position.z < -20) this.camera.position.z += 1;
  }
}
