import { ILoadingScreen } from "@babylonjs/core";

class Loading implements ILoadingScreen {
  public loadingUIBackgroundColor: string;
  public loadingUIText: string;

  public loadingScreenDiv;
  public loadingScreenTxt;
  public loadingTextDetailsTxt;

  constructor() {
    this.loadingScreenDiv = window.document.getElementById("loadingScreen");
    this.loadingScreenTxt = window.document.getElementById("loadingText");
    this.loadingTextDetailsTxt =
      window.document.getElementById("loadingTextDetails");
  }

  public displayLoadingUI() {
    this.loadingScreenDiv.style.display = "block";
    this.loadingScreenTxt.innerHTML = "Loading Assets...";
  }

  public hideLoadingUI() {
    this.loadingScreenDiv.style.display = "none";
  }
}

export { Loading, ILoadingScreen };
