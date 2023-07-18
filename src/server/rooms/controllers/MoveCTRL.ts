import Logger from "../../../shared/Logger";
import { PlayerInputs } from "src/shared/types";
import { PlayerSchema } from "../schema/PlayerSchema";
import { Vector3 } from "../../../shared/yuka";

export class MoveCTRL {
  private _owner: PlayerSchema;

  constructor(owner: PlayerSchema) {
    this._owner = owner;
  }

  public update() {}

  /**
   * Calculate next forward position on the navmesh based on playerInput forces
   * @param {PlayerInputs} playerInput
   */
  processPlayerInput(playerInput: PlayerInputs) {
    // TODO: speed 를 어디서 셋팅?
    //let speed = this._owner.speed;
    let speed = 0.6;

    // save current position
    let oldX = this._owner.x;
    let oldY = this._owner.y;
    let oldZ = this._owner.z;
    let oldRot = this._owner.rot;

    // caculate new position
    let newX = this._owner.x - playerInput.h * speed;
    let newY = this._owner.y;
    let newZ = this._owner.z - playerInput.v * speed;
    let newRot = Math.atan2(playerInput.h, playerInput.v);

    // check if destination is in navmesh
    let sourcePos = new Vector3(oldX, oldY, oldZ);
    let destinationPos = new Vector3(newX, newY, newZ);
    const foundPath: any = true; // TODO: apply navmesh
    if (foundPath) {
      // next position validated, update player
      this._owner.x = newX;
      this._owner.y = newY;
      this._owner.z = newZ;
      this._owner.rot = newRot;

      // Logger.info(
      //   `Valid position for ${this._owner.name} :
      //   (x: ${this._owner.x}, y: ${this._owner.y}, z: ${this._owner.z}, rot: ${this._owner.rot})`
      // );
    } else {
      // collision detected, return player old position
      this._owner.x = oldX;
      this._owner.y = 0;
      this._owner.z = oldZ;
      this._owner.rot = oldRot;

      // Logger.info(
      //   `Invalid position for ${this._owner.name} :
      //   (x: ${this._owner.x}, y: ${this._owner.y}, z: ${this._owner.z}, rot: ${this._owner.rot})`
      // );
    }
  }
}
