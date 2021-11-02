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
import { WolfModel } from "./colony/wolf/wolf.model";
import { SheepModel } from "./colony/sheep/sheep.model";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

  private _logger: Logger = new Logger("AppGateway");
  private sheepService: SheepService = new SheepService();
  private wolfService: WolfService = new WolfService();
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

  afterInit(server: Server): void {
    this.logger.log("Init!");
    this.wss.emit("msgToClient", "Init!");
    this.FIELD_SIZE = 600;
    this.generateAnimals(10);
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    this.logger.log(`Connected! ${client.id}`);
    await this.startSimulation();
  }

  /**
   * generates a wolf and sheeps by @param sheepCount
   * @param sheepCount
   */
  public generateAnimals(sheepCount: number): void {
    let randomCoordinates: Coordinates;
    let sheep: SheepModel;
    for (let id = 0; id < sheepCount; id++) {
      randomCoordinates = Utils.getRandomCoordinates(this.FIELD_SIZE);
      sheep = new SheepModel(id, randomCoordinates);
      this.sheepController.addSheep(sheep);
    }
    let centerCoordinate: Coordinates = new Coordinates(Math.floor(this.FIELD_SIZE / 2), Math.floor(this.FIELD_SIZE / 2));
    let wolf = new WolfModel(Math.floor(Math.random() * 300), centerCoordinate, 10);
    this.wolfController.addWolf(wolf);
  }

  /**
   * logs disconnect
   * @param client
   */
  handleDisconnect(client: Socket): void {
    this.logger.log(`Disconnected! ${client.id}`);
  }

  /**
   * starts simulation
   * @private
   */
  private async startSimulation(): Promise<void> {
    let webSocketService: Server = this.wss;
    let sheeps: SheepModel[] = this.sheepController.getAllSheeps();
    let wolfSpeed: number = 11;
    let wolf: WolfModel;
    let consumableSheep: SheepModel;
    do {
      wolf = this.wolfController.getWolf();
      sheeps = this.sheepController.getAllSheeps();
      if (sheeps.length === 0) break;
      this.sheepController.updateSheepPositions(1, wolf.getPosition, this.FIELD_SIZE);
      this.wolfController.updateWolfPosition(wolfSpeed, sheeps, this.FIELD_SIZE);
      await Utils.delay(50);
      webSocketService.emit("wolf", wolf);
      webSocketService.emit("sheeps", sheeps);
      consumableSheep = this.wolfController.getSheepIfWolfCanConsumeIt(sheeps);
      if (consumableSheep) {
        this.sheepController.removeSheep(consumableSheep);
        this.wolfController.updateWolfSize(1);
        wolfSpeed--;
      }
    } while (sheeps.length > 0);
    this.logger.log("Simulation Ended!");
    webSocketService.emit("end");
  }
}
