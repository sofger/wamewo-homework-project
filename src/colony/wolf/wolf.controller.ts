import { Controller } from "@nestjs/common";
import { WolfService } from "./wolf.service";
import { Coordinates } from "../../coordinates/coordinates.model";
import { SheepModel } from "../sheep/sheep.model";

@Controller()
export class WolfController {

  private wolfService: WolfService;

  constructor(wolfService: WolfService) {
    this.wolfService = wolfService;
  }

  /**
   * adds new wolf
   */
  addWolf(id: number, position: Coordinates, size: number) {
    this.wolfService.addWolf(id, position, size);
  }

  /**
   * returns wolf
   */
  getWolf() {
    return this.wolfService.getWolf();
  }

  /**
   * returns sheep if it can be removed, if no match returns null
   * @param sheeps
   */
  getSheepIfWolfCanConsumeIt(sheeps: SheepModel[]): any {
    return this.wolfService.getSheepIfWolfCanConsumeIt(sheeps);
  }

  /**
   * Updates wolf x and y coordinates by wolfSpeed in the direction according to closest sheep position
   * @param wolfSpeed
   * @param sheeps
   * @param FIELD_WIDTH
   */
  updateWolfPosition(wolfSpeed: number, sheeps: SheepModel[], FIELD_WIDTH): void {
    this.wolfService.updateWolfPosition(wolfSpeed, sheeps, FIELD_WIDTH);
  }

  /**
   * updates wolf size by param
   * @param wolfSizeIncremental
   */
  updateWolfSize(wolfSizeIncremental) {
    this.wolfService.updateWolfSize(wolfSizeIncremental);
  }
}
