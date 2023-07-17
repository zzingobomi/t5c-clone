import State from "../client/Screens/Screens";

const Config = {
  // server settings
  port: 3000,
  maxClients: 20,
  updateRate: 100, // Set frequency the patched state should be sent to all clients, in milliseconds
  logLevel: "info",

  // basic locations
  initialLocation: "lh_town",

  // default scene
  defaultScene: State.LOGIN,
};

export default Config;
