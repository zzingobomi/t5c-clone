import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import "@babylonjs/loaders/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness";
import "@babylonjs/loaders/glTF/2.0/Extensions/KHR_draco_mesh_compression";

import { Engine, Scene } from "@babylonjs/core";

// IMPORT SCREEN
import State, { Screen } from "./Screens/Screens";
import { Loading } from "./Controllers/Loading";
import { LoginScene } from "./Screens/LoginScene";
import { GameScene } from "./Screens/GameScene";
import Config from "../shared/Config";
import { Network } from "./Controllers/Network";

export class App {
  // babylon
  public canvas: HTMLCanvasElement;
  public engine: Engine;
  public client: Network;
  public scene: Scene;

  // scene management
  public state: number = 0;
  public currentScene: Screen;
  public nextScene: number;

  constructor() {
    // create canvas
    this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

    // initialize babylon scene and engine
    this._init();

    // setup default values
    this.setDefault();
  }

  private async _init(): Promise<void> {
    // create engine
    this.engine = new Engine(this.canvas, true, {
      adaptToDeviceRatio: true,
    });

    // loading
    const loadingScreen = new Loading();
    this.engine.loadingScreen = loadingScreen;

    // create colyseus client
    this.client = new Network();

    // main render loop
    await this._render();
  }

  private async _render(): Promise<void> {
    // render loop
    this.engine.runRenderLoop(() => {
      // monitor state
      this.state = this.checkForScreenChange();

      switch (this.state) {
        case State.LOGIN:
          this.clearScene();
          this.currentScene = new LoginScene();
          this.currentScene.createScene(this);
          this.scene = this.currentScene._scene;
          this.state = State.NULL;

          break;

        case State.GAME:
          this.clearScene();
          this.currentScene = new GameScene();
          this.currentScene.createScene(this);
          this.scene = this.currentScene._scene;
          this.state = State.NULL;
          break;

        default:
          break;
      }

      // render when scene is ready
      this._process();
    });
  }

  setDefault() {
    global.T5C = {
      nextScene: Config.defaultScene,
      camY: 0,
    };
  }

  private checkForScreenChange() {
    let currentScene = global.T5C.nextScene;
    if (global.T5C.nextScene != State.NULL) {
      global.T5C.nextScene = State.NULL;
      return currentScene;
    }
  }

  private async _process(): Promise<void> {
    // make sure scene and camera is initialized
    if (this.scene && this.scene.activeCamera) {
      // when the scene is ready, hide loading
      this.engine.hideLoadingUI();

      // render scene
      this.scene.render();
    }
  }

  private clearScene() {
    if (this.scene) {
      this.engine.displayLoadingUI();
      this.scene.detachControl();
      this.scene.dispose();
      this.currentScene = null;
    }
  }
}

new App();
