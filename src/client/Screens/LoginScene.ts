import { Color4, FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Rectangle } from "@babylonjs/gui";
import { SceneController } from "../Controllers/Scene";
import State, { Screen } from "./Screens";
import { App } from "..";

export class LoginScene implements Screen {
  _scene: Scene;

  public async createScene(app: App) {
    const scene = new Scene(app.engine);
    scene.clearColor = new Color4(0, 0, 0, 1);

    const camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
    camera.setTarget(Vector3.Zero());

    //--GUI--
    const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // background image
    const imageRect = new Rectangle("background");
    imageRect.width = 1;
    imageRect.height = 1;
    imageRect.background = "#999999";
    imageRect.thickness = 0;
    guiMenu.addControl(imageRect);

    // guest button
    const joinGuestBtn = Button.CreateSimpleButton(
      "joinGuestBtn",
      "Quick Play"
    );
    joinGuestBtn.width = 0.8;
    joinGuestBtn.height = "30px";
    joinGuestBtn.color = "white";
    joinGuestBtn.thickness = 1;
    guiMenu.addControl(joinGuestBtn);
    joinGuestBtn.onPointerDownObservable.add(async () => {
      SceneController.goToScene(State.GAME);
    });

    // load scene
    this._scene = scene;
    await this._scene.whenReadyAsync();
  }
}
