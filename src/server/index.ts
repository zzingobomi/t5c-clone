import { createServer } from "http";
import express from "express";
import cors from "cors";
import path from "path";
import Config from "../shared/Config";
import { Server, matchMaker } from "@colyseus/core";
import { monitor } from "@colyseus/monitor";
import { GameRoom } from "./rooms/GameRoom";
import { WebSocketTransport } from "@colyseus/ws-transport";
import Logger from "../shared/Logger";

class GameServer {
  constructor() {
    this.init();
  }

  async init() {
    //////////////////////////////////////////////////
    ///////////// COLYSEUS GAME SERVER ///////////////
    //////////////////////////////////////////////////

    const port = Config.port;
    const app = express();
    app.use(cors());

    // create colyseus server
    const gameServer = new Server({
      transport: new WebSocketTransport({
        server: createServer(app),
      }),
    });

    // define all rooms
    gameServer.define("game_room", GameRoom);

    // on localhost, simulate bad latency
    if (process.env.NODE_ENV !== "production") {
      Logger.info("[gameserver] Simulating 500ms of latency.");
      gameServer.simulateLatency(234);
    }

    // listen
    gameServer.listen(port).then(() => {
      matchMaker.createRoom("game_room", { location: "lh_town" });
    });

    // start monitor
    app.use("/colyseus", monitor());

    //////////////////////////////////////////////////
    //// SERVING CLIENT DIST FOLDER TO EXPRESS ///////
    //////////////////////////////////////////////////

    // default to built client index.html
    const indexPath = "dist/client/";
    const clientFile = "index.html";

    // serve client
    app.use(express.static(indexPath));
    const indexFile = path.resolve(`${indexPath}${clientFile}`);
    app.get("/", function (req, res) {
      res.sendFile(indexFile);
    });
  }
}

new GameServer();
