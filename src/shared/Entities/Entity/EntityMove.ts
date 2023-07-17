import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { PlayerSchema } from "src/server/rooms/schema/PlayerSchema";

export class EntityMove {
  private _mesh: AbstractMesh;
  private speed: number;

  private nextPosition: Vector3;
  private nextRotation: Vector3;

  constructor(mesh: AbstractMesh, speed: number) {
    this._mesh = mesh;
    this.speed = speed;
  }

  public getNextPosition() {
    return this.nextPosition;
  }

  public getNextRotation() {
    return this.nextRotation;
  }

  public setPositionAndRotation(entity: PlayerSchema) {
    this.nextPosition = new Vector3(entity.x, entity.y, entity.z);
    this.nextRotation = new Vector3(0, entity.rot, 0);
  }

  public tween() {
    this._mesh.position = this.nextPosition;
    this._mesh.rotation = this.nextRotation;
    // // continuously lerp between current position and next position
    // this._mesh.position = Vector3.Lerp(
    //   this._mesh.position,
    //   this.nextPosition,
    //   0.15
    // );

    // // rotation
    // // TODO : make it better
    // // maybe look into Scalar.LerpAngle ??? https://doc.babylonjs.com/typedoc/classes/BABYLON.Scalar#LerpAngle
    // const gap = Math.abs(this._mesh.rotation.y - this.nextRotation.y);
    // if (gap > Math.PI) this._mesh.rotation.y = this.nextRotation.y;
    // else
    //   this._mesh.rotation = Vector3.Lerp(
    //     this._mesh.rotation,
    //     this.nextRotation,
    //     0.8
    //   );
  }
}
