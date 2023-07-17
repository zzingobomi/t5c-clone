import {
  KeyboardInfo,
  KeyboardEventTypes,
  PointerEventTypes,
  PointerInfo,
  Scene,
} from "@babylonjs/core";
import { MouseButtonType } from "../../shared/Utils/index";

export class PlayerInput {
  //public inputMap: {};
  private _scene: Scene;

  // simple movement
  public horizontal: number = 0;
  public vertical: number = 0;

  // moving
  public leftClick: boolean;
  public rightClick: boolean;
  public mouseMoving: boolean = false;

  public playerCanMove: boolean = false;

  // digits
  public digitPressed: number = 0;

  public movementX: number = 0;
  public movementY: number = 0;

  constructor(scene: Scene) {
    this._scene = scene;

    // detect mouse movement
    this._scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
      if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
        if (pointerInfo.event.button === MouseButtonType.LEFT_BUTTON) {
          this.leftClick = true;
        }
        if (pointerInfo.event.button === MouseButtonType.RIGHT_BUTTON) {
          this.rightClick = true;
        }
      }

      if (pointerInfo.type === PointerEventTypes.POINTERUP) {
        if (pointerInfo.event.button === MouseButtonType.LEFT_BUTTON) {
          this.leftClick = false;
          this.vertical = 0;
          this.horizontal = 0;
        }
        if (pointerInfo.event.button === MouseButtonType.RIGHT_BUTTON) {
          this.rightClick = false;
        }
        this.playerCanMove = false;
        this.mouseMoving = false;
      }

      if (pointerInfo.type === PointerEventTypes.POINTERMOVE) {
        if (this.leftClick) {
          this.playerCanMove = true;
          // [-1, -1] ~ [1, 1] 로 정규화
          const x =
            (pointerInfo.event.clientX / pointerInfo.event.target.width) * 2 -
            1;
          const y =
            (pointerInfo.event.clientY / pointerInfo.event.target.height) * 2 -
            1;
          this._updateFromMouse(Math.atan2(x, y));
        }
        if (this.rightClick) {
          this.mouseMoving = true;
          this.movementX = pointerInfo.event.movementX / 100;
          this.movementY = pointerInfo.event.movementY / 100;
        }
      }
    });

    this._scene.onKeyboardObservable.add((kbInfo: KeyboardInfo) => {
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          if (kbInfo.event.code === "Digit1") {
            this.digitPressed = 1;
          }
          if (kbInfo.event.code === "Digit2") {
            this.digitPressed = 2;
          }
          if (kbInfo.event.code === "Digit3") {
            this.digitPressed = 3;
          }
          if (kbInfo.event.code === "Digit4") {
            this.digitPressed = 4;
          }
          if (kbInfo.event.code === "Digit5") {
            this.digitPressed = 5;
          }
          if (kbInfo.event.code === "Digit6") {
            this.digitPressed = 6;
          }
          if (kbInfo.event.code === "Digit7") {
            this.digitPressed = 7;
          }
          if (kbInfo.event.code === "Digit8") {
            this.digitPressed = 8;
          }
          if (kbInfo.event.code === "Digit9") {
            this.digitPressed = 9;
          }
          break;
      }
    });
  }

  // forward - backward movement
  private _updateFromMouse(rotY: number) {
    this.vertical = -Math.cos(rotY + Math.PI - global.T5C.camY);
    this.horizontal = Math.sin(rotY + Math.PI - global.T5C.camY);
  }
}
