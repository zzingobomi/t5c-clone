import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";
import { Matrix, Vector3 } from "@babylonjs/core/Maths/math";
import { Entity } from "../Entity";

export class EntityMesh {
  private _entity: Entity;
  private _scene: Scene;
  private _loadedAssets;
  private _room;
  public mesh: Mesh;
  public playerMesh;
  public isCurrentPlayer: boolean;

  constructor(entity: Entity) {
    this._entity = entity;
    this._entity.race = "male_adventurer";
    this._scene = entity._scene;
    this._loadedAssets = entity._loadedAssets;
    this.isCurrentPlayer = entity.isCurrentPlayer;
    this._room = entity._room;
  }

  public async load() {
    // create collision cube
    const box = MeshBuilder.CreateBox(
      this._entity.sessionId,
      { width: 1.5, height: 2.5, depth: 1.5 },
      this._scene
    );
    box.visibility = 0;
    box.setPivotMatrix(Matrix.Translation(0, 1, 0), false);

    // set collision mesh
    this.mesh = box;
    this.mesh.isPickable = true;
    this.mesh.isVisible = true;
    this.mesh.checkCollisions = true;
    this.mesh.showBoundingBox = true;
    this.mesh.position = new Vector3(
      this._entity.x,
      this._entity.y,
      this._entity.z
    );

    // load player mesh
    const result =
      this._loadedAssets[
        `RACE_${this._entity.race}`
      ].instantiateModelsToScene();

    const playerMesh = result.rootNodes[0];
  }
}
