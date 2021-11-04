import { Controller, Param } from '@nestjs/common';
import { SheepService } from './sheep.service';
import { SheepModel } from './sheep.model';
import { Coordinates } from '../../coordinates/coordinates.model';

@Controller()
export class SheepController {
  private sheepService: SheepService;

  constructor(sheepService: SheepService) {
    this.sheepService = sheepService;
  }

  clearField(){
    this.sheepService.clear();
  }

  /**
   * add new sheep to collection
   * @param sheep the sheep unique id
   */
  addSheep(sheep: SheepModel): void {
    this.sheepService.addSheep(sheep);
  }

  /**
   * removes sheep by param
   * @param sheep
   */
  removeSheep(sheep): void {
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
  findOneSheep(@Param('id') sheepId: number): any {
    return this.sheepService.findSheep(sheepId);
  }

  /**
   * Updates sheep x and y coordinates bay sheepspeed in the direction according to wolf position
   * @param sheepSpeed
   * @param wolfPosition
   * @param FIELD_WIDTH
   */
  updateSheepPositions(
    sheepSpeed: number,
    wolfPosition: Coordinates,
    FIELD_WIDTH: number,
  ): void {
    this.sheepService.updateSheepPositions(
      sheepSpeed,
      wolfPosition,
      FIELD_WIDTH,
    );
  }
}
