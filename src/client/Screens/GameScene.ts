import {
  AssetContainer,
  Color3,
  Color4,
  DirectionalLight,
  HemisphericLight,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { Player } from "../../shared/Entities/Player";
import { Environment } from "../Controllers/Environment";
import { LocationsDB } from "../../shared/Data/LocationsDB";

export class GameScene {
  private _app;
  private _scene: Scene;
  private _environment: Environment;

  private _currentPlayer: Player;
  private _loadedAssets: AssetContainer[] = [];

  async createScene(app): Promise<void> {
    this._app = app;

    const scene = new Scene(app.engine);
    this._scene = scene;

    const location = LocationsDB.lh_town;

    if (location.skyColor) {
      scene.clearColor = new Color4(
        location.skyColor,
        location.skyColor,
        location.skyColor,
        1
      );
    }

    if (location.sun) {
      // ambient light
      const ambientLight = new HemisphericLight(
        "light1",
        new Vector3(0, 1, 0),
        scene
      );
      ambientLight.intensity = 1;
      ambientLight.groundColor = new Color3(0.13, 0.13, 0.13);
      ambientLight.specular = Color3.Black();
    }

    // fog
    scene.fogMode = Scene.FOGMODE_LINEAR;
    scene.fogStart = 60.0;
    scene.fogEnd = 120.0;
    scene.fogColor = new Color3(0.9, 0.9, 0.85);

    // shadow light
    const light = new DirectionalLight(
      "DirectionalLight",
      new Vector3(-1, -2, -1),
      scene
    );
    light.position = new Vector3(100, 100, 100);
    light.radius = 0.27;
    light.intensity = location.sunIntensity;
    light.autoCalcShadowZBounds = true;

    // load assets and remove them all from scene
    this._environment = new Environment(this._scene, this._loadedAssets);
    await this._environment.loadAssets();

    // load the rest
    this._app.engine.displayLoadingUI();
    await this._initNetwork();

    // Player test
    //const player = new Player(this._scene);
    //this._currentPlayer = player;

    //this._app.engine.hideLoadingUI();
  }

  private async _initNetwork(): Promise<void> {
    try {
    } catch (e) {
      alert("Failed to connect.");
    }
  }
}
