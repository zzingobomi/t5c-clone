import { Scene } from "@babylonjs/core";
import { Entity } from "../Entity";

export class EntityMesh {
  private _entity: Entity;
  private _scene: Scene;
  private _loadedAssets;
  private _room;
  public isCurrentPlayer: boolean;

  constructor(entity: Entity) {
    this._entity = entity;
    this._entity.race = "male_adventurer";
    this._scene = entity._scene;
    this._loadedAssets = entity._loadedAssets;
    this.isCurrentPlayer = entity.isCurrentPlayer;
    this._room = entity._room;
  }

  // TODO: 에러가 남..
  public async load() {
    // load player mesh
    const result =
      this._loadedAssets[
        `RACE_${this._entity.race}`
      ].instantiateModelsToScene();
  }
}
