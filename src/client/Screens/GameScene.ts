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
import { Room } from "colyseus.js";
import { Screen } from "./Screens";
import { App } from "..";
import { GameRoomState } from "src/server/rooms/state/GameRoomState";
import { PlayerSchema } from "src/server/rooms/schema/PlayerSchema";

export class GameScene implements Screen {
  _app: App;
  _scene: Scene;
  _environment: Environment;

  room: Room<GameRoomState>;
  _currentPlayer: Player;
  _loadedAssets: AssetContainer[] = [];

  async createScene(app: App) {
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
  }

  private async _initNetwork(): Promise<void> {
    try {
      const room = await this._app.client.findCurrentRoom("lh_town");
      if (room) {
        // join game room
        this.room = await this._app.client.joinRoom(room.roomId);

        await this._initEvents();
      }
    } catch (e) {
      alert("Failed to connect.");
    }
  }

  private async _initEvents() {
    ////////////////////////////////////////////////////
    //  when a entity joins the room event
    this.room.state.players.onAdd((entity: PlayerSchema, sessionId: string) => {
      const isCurrentPlayer = sessionId === this.room.sessionId;

      //////////////////
      // if player type
      if (isCurrentPlayer) {
        // create player entity
        const _player = new Player(
          entity,
          this.room,
          this._scene,
          this._loadedAssets
        );

        this._currentPlayer = _player;

        this._app.engine.hideLoadingUI();
      }
      //////////////////
      // else if entity or another player
      else {
      }
    });
  }
}
