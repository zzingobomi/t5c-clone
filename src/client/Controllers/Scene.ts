import State from "../Screens/Screens";

export class SceneController {
  static goToScene(newState: State) {
    global.T5C.nextScene = newState;
  }
}
