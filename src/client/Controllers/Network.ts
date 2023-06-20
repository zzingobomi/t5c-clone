import { Client } from "colyseus.js";
import Config from "../../shared/Config";

export class Network {
  public _client;

  constructor() {
    // create colyseus client
    let url = `ws://localhost:${Config.port}`;
    this._client = new Client(url);
  }

  public async joinRoom(roomId): Promise<any> {
    return await this._client.joinById(roomId);
  }

  public async findCurrentRoom(currentRoomKey): Promise<any> {
    return new Promise(async (resolve: any, reject: any) => {
      const rooms = await this._client.getAvailableRooms("game_room");
      if (rooms.length > 0) {
        rooms.forEach((room) => {
          if (room.metadata.location === currentRoomKey) {
            resolve(room);
          }
        });
      }
      resolve(false);
    });
  }
}
