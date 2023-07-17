import {
  AssetContainer,
  PointerEventTypes,
  PointerInfo,
  Scene,
} from "@babylonjs/core";
import { Entity } from "./Entity";
import { PlayerCamera } from "./Player/PlayerCamera";
import { PlayerSchema } from "../../server/rooms/schema/PlayerSchema";
import { Room } from "colyseus.js";
import { MouseButtonType } from "../Utils";

export class Player extends Entity {
  constructor(
    entity: PlayerSchema,
    room: Room,
    scene: Scene,
    _loadedAssets: AssetContainer[]
  ) {
    super(entity, room, scene, _loadedAssets);

    this.type = "player";

    this.spawnPlayer();
  }

  private async spawnPlayer() {
    this.cameraController = new PlayerCamera(this._scene);

    // mouse events
    this._scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
      if (
        pointerInfo.type === PointerEventTypes.POINTERDOWN &&
        pointerInfo.event.button === MouseButtonType.LEFT_BUTTON
      ) {
      }

      if (
        pointerInfo.type === PointerEventTypes.POINTERDOWN &&
        pointerInfo.event.button === MouseButtonType.RIGHT_BUTTON
      ) {
      }

      if (pointerInfo.type === PointerEventTypes.POINTERWHEEL) {
        const wheelEvent = pointerInfo.event as WheelEvent;
        this.cameraController.zoom(wheelEvent.deltaY);
      }
    });

    //////////////////////////////////////////////////////////////////////////
    // player before render loop
    //////////////////////////////////////////////////////////////////////////
    this._scene.registerBeforeRender(() => {
      // move camera as player moves
      this.cameraController.follow(this.mesh.position, this.mesh.rotation.y);
    });
  }

  public update() {
    if (this && this.moveController) {
      // global camera rotation
      global.T5C.camY = this.cameraController._camRoot.rotation.y;

      // tween entity
      this.moveController.tween();
    }
  }
}
