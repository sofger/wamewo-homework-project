import { Controller } from "@nestjs/common";
import { WolfService } from "./wolf.service";
import { SheepModel } from "../sheep/sheep.model";
import { WolfModel } from "./wolf.model";

@Controller()
export class WolfController {

  private wolfService: WolfService;

  constructor(wolfService: WolfService) {
    this.wolfService = wolfService;
  }

  /**
   * Adds a new wolf
   * @param wolf
   */
  addWolf(wolf: WolfModel): void {
    this.wolfService.addWolf(wolf);
  }

  /**
   * returns wolf
   */
  getWolf(): WolfModel {
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
  updateWolfSize(wolfSizeIncremental): void {
    this.wolfService.updateWolfSize(wolfSizeIncremental);
  }
}
