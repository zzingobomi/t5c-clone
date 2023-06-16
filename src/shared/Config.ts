import State from "../client/Screens/Screens";

const Config = {
  // server settings
  port: 3000,
  maxClients: 20,
  logLevel: "info",

  // basic locations
  initialLocation: "lh_town",

  // default scene
  defaultScene: State.LOGIN,
};

export default Config;
