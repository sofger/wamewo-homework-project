import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { Utils } from "./util/utils";
import { SheepService } from "./colony/sheep/sheep.service";
import { SheepController } from "./colony/sheep/sheep.controller";
import { WolfController } from "./colony/wolf/wolf.controller";
import { WolfService } from "./colony/wolf/wolf.service";
import { Coordinates } from "./coordinates/coordinates.model";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

  private _logger: Logger = new Logger("AppGateway");
  private sheepService = new SheepService();
  private wolfService = new WolfService();
  private sheepController: SheepController = new SheepController(this.sheepService);
  private wolfController: WolfController = new WolfController(this.wolfService);

  private _FIELD_SIZE: number;

  get FIELD_SIZE(): number {
    return this._FIELD_SIZE;
  }

  set FIELD_SIZE(value: number) {
    this._FIELD_SIZE = value;
  }

  public get logger(): Logger {
    return this._logger;
  }

  get wss(): Server {
    return this._wss;
  }

  @WebSocketServer() private _wss: Server;

  afterInit(server: Server) {
    this.logger.log("Init!");
    this.wss.emit("msgToClient", "Init!");
    this.FIELD_SIZE = 400;
    this.generateAnimals(10);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Connected! ${client.id}`);
    await this.startSimulation();
  }

  /**
   * generates a wolf and sheeps by @param sheepCount
   * @param sheepCount
   */
  public generateAnimals(sheepCount: number): void {
    for (let id = 0; id < sheepCount; id++) {
      let randomCoordinates: Coordinates = Utils.getRandomCoordinates(this.FIELD_SIZE);
      this.sheepController.addSheep(id, randomCoordinates);
    }
    let centerCoordinate: Coordinates = new Coordinates(Math.floor(this.FIELD_SIZE / 2), Math.floor(this.FIELD_SIZE / 2));
    this.wolfController.addWolf(Math.floor(Math.random() * 300), centerCoordinate, 10);
  }

  /**
   * logs disconnect
   * @param client
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected! ${client.id}`);
  }

  /**
   * starts simulation
   * @private
   */
  private async startSimulation() {
    let webSocketService = this.wss;
    let sheeps = this.sheepController.getAllSheeps();
    do {
      let wolf = this.wolfController.getWolf();
      sheeps = this.sheepController.getAllSheeps();
      if (sheeps.length === 0) break;
      this.sheepController.updateSheepPositions(1, wolf.getPosition, this.FIELD_SIZE);
      this.wolfController.updateWolfPosition(2, sheeps, this.FIELD_SIZE);
      await Utils.delay(20);
      webSocketService.emit("wolf", wolf);
      webSocketService.emit("sheeps", sheeps);
      let consumableSheep = this.wolfController.getSheepIfWolfCanConsumeIt(sheeps);
      if (consumableSheep) {
        this.sheepController.removeSheep(consumableSheep);
      }
    } while (sheeps.length > 0);
    this.logger.log("Simulation Ended!");
  }
}
