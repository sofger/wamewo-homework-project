import { Controller, Param } from "@nestjs/common";
import { SheepService } from "./sheep.service";
import { SheepModel } from "./sheep.model";
import { Coordinates } from "../../coordinates/coordinates.model";


@Controller()
export class SheepController {
  private sheepService: SheepService;

  constructor(sheepService: SheepService) {
    this.sheepService = sheepService;
  }

  /**
   * add new sheep to collection
   * @param sheepId the sheep unique id
   * @param coordinate  the sheep coordinate
   */
  addSheep(sheepId: number, coordinate: Coordinates) {
    this.sheepService.addSheep(sheepId, coordinate);
  }

  /**
   * removes sheep by param
   * @param sheep
   */
  removeSheep(sheep) {
    this.sheepService.removeSheep(sheep);
  }

  /**
   * returns all sheeps
   */
  getAllSheeps(): SheepModel[] {
    return this.sheepService.getAllSheeps();
  }

  /**
   * finds sheep by id
   * @param sheepId
   */
  findOneSheep(@Param("id") sheepId: number) {
    return this.sheepService.findSheep(sheepId);
  }

  /**
   * Updates sheep x and y coordinates bay sheepspeed in the direction according to wolf position
   * @param sheepSpeed
   * @param wolfPosition
   * @param FIELD_WIDTH
   */
  updateSheepPositions(sheepSpeed: number, wolfPosition: Coordinates, FIELD_WIDTH: number): void {
    this.sheepService.updateSheepPositions(sheepSpeed, wolfPosition, FIELD_WIDTH);
  }
}