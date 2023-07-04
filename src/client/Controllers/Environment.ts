import {
  AssetsManager,
  ContainerAssetTask,
  MeshAssetTask,
  Scene,
} from "@babylonjs/core";

export class Environment {
  private _scene: Scene;
  private _assetsManager: AssetsManager;
  private _loadedAssets;
  private _loadingTxt;

  constructor(scene: Scene, _loadedAssets) {
    this._scene = scene;
    this._loadedAssets = _loadedAssets;
    this._loadingTxt = window.document.getElementById("loadingTextDetails");

    this._assetsManager = new AssetsManager(scene);
  }

  private showLoadingMessage(msg) {
    if (this._loadingTxt) {
      this._loadingTxt.innerHTML = msg;
    }
  }

  public async loadNavMesh() {}

  public async loadAssets() {
    const environmentName = "lh_town";
    const environmentModel = "lh_town";

    let assetsToLoad = [
      // environment
      {
        name: `ENV_${environmentName}`,
        filename: `environment/${environmentModel}.glb`,
        extension: "glb",
        instantiate: false,
      },
    ];

    // add races (mesh)
    assetsToLoad.push({
      name: "RACE_male_adventurer",
      filename: "races/male_adventurer.glb",
      extension: "glb",
      instantiate: true,
    });

    assetsToLoad.forEach((obj) => {
      let assetTask;
      switch (obj.extension) {
        case "babylon":
        case "gltf":
        case "glb":
        case "obj":
          if (obj.instantiate) {
            assetTask = this._assetsManager.addContainerTask(
              obj.name,
              "",
              "",
              `./models/${obj.filename}`
            );
          } else {
            assetTask = this._assetsManager.addMeshTask(
              obj.name,
              "",
              "",
              `./models/${obj.filename}`
            );
          }
          break;

        default:
          console.error(
            `Error loading asset ${obj.name}. Unrecognized file extension ${obj.extension}`
          );
      }

      assetTask.onSuccess = (task) => {
        switch (task.constructor) {
          case ContainerAssetTask:
            this._loadedAssets[task.name] = task.loadedContainer;
            break;
          case MeshAssetTask:
            this._loadedAssets[task.name] = task;
            break;
          default:
            console.log(
              `Error loading asset ${task.name}. Unrecognized AssetManager task type.`
            );
            break;
        }
      };

      assetTask.onError = (task, message, exception) => {
        console.log(message, exception);
      };
    });

    this._assetsManager.onProgress = (
      remainingCount,
      totalCount,
      lastFinishedTask
    ) => {
      const loadingMsg = `${(
        ((totalCount - remainingCount) / totalCount) *
        100
      ).toFixed(0)}%`;
      this.showLoadingMessage(loadingMsg);
    };

    this._assetsManager.onFinish = () => {
      console.log("loading complete", this._loadedAssets);
      this.showLoadingMessage("100%");
    };

    await this._assetsManager.loadAsync();
  }
}
