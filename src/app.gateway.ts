import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

  private _logger: Logger = new Logger("AppGateway");

  @WebSocketServer() private _wss: Server;

  get wss(): Server {
    return this._wss;
  }
}
