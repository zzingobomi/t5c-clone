import {
  Node,
  Mesh,
  MeshBuilder,
  AssetContainer,
  Scene,
} from "@babylonjs/core";
import { Matrix, Vector3 } from "@babylonjs/core/Maths/math";
import { Room } from "colyseus.js";
import { Entity } from "../Entity";

export class EntityMesh {
  private _entity: Entity;
  private _scene: Scene;
  private _loadedAssets: AssetContainer[];
  private _room: Room;
  public mesh: Mesh;
  public playerMesh: Node;
  public isCurrentPlayer: boolean;

  constructor(entity: Entity) {
    this._entity = entity;
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

    this.mesh.metadata = {
      sessionId: this._entity.sessionId,
      type: this._entity.type,
      race: this._entity.race,
      name: this._entity.name,
    };

    // load player mesh
    const result = (
      this._loadedAssets[`RACE_${this._entity.race}`] as AssetContainer
    ).instantiateModelsToScene();

    const playerMesh = result.rootNodes[0];

    // set initial player scale & rotation
    playerMesh.name = `${this._entity.sessionId}_mesh`;
    playerMesh.parent = box;
    this.playerMesh = playerMesh;
  }
}
