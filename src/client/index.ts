import { Engine, Scene } from "@babylonjs/core";

// IMPORT SCREEN
import State from "./Screens/Screens";
import { Loading } from "./Controllers/Loading";
import { LoginScene } from "./Screens/LoginScene";
import { GameScene } from "./Screens/GameScene";

class App {
  // babylon
  public canvas;
  public engine: Engine;
  public scene: Scene;

  // scene management
  public state: number = 0;
  public currentScene;
  public nextScene;

  constructor() {
    // create canvas
    this.canvas = document.getElementById("renderCanvas");

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
      nextScene: State.LOGIN,
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
