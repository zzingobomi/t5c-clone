import { Scene } from "@babylonjs/core";
import { Player } from "../../shared/Entities/Player";

export class GameScene {
  private _app;
  private _scene: Scene;

  private _currentPlayer: Player;

  async createScene(app): Promise<void> {
    this._app = app;

    const scene = new Scene(app.engine);
    this._scene = scene;

    this._app.engine.displayLoadingUI();

    const player = new Player(this._scene);
    this._currentPlayer = player;

    this._app.engine.hideLoadingUI();
  }
}
