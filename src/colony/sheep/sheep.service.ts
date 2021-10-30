import { Injectable, NotFoundException } from "@nestjs/common";
import { SheepModel } from "./sheep.model";
import { Coordinates } from "../../coordinates/coordinates.model";
import { Direction } from "../../coordinates/direction.enum";

@Injectable()
export class SheepService {
  private sheeps: SheepModel[] = [];

  /**
   * add new sheep to collection
   * @param sheepId the sheep unique id
   * @param coordinate  the sheep coordinate
   */
  addSheep(sheepId: number, coordinate: Coordinates): void {
    const newSheep = new SheepModel(sheepId, coordinate);
    this.sheeps.push(newSheep);
  }

  /**
   * returns all sheeps
   */
  getAllSheeps(): SheepModel[] {
    return [...this.sheeps];
  }

  /**
   * removes sheep
   * @param sheep
   */
  removeSheep(sheep): void {
    this.sheeps.splice(this.sheeps.indexOf(sheep), 1);
  }

  /**
   * finds sheep by id
   * @param sheepId
   */
  findSheep(sheepId: number): any {
    const sheep = this.sheeps.find(sheep => sheep.id === sheepId);
    if (!sheep) {
      throw new NotFoundException("Sheep not found");
    }
    return sheep;
  }

  /**
   * Updates sheep x and y coordinates bay sheepspeed in the direction according to wolf position
   * @param sheepSpeed
   * @param wolfPosition
   * @param FIELD_WIDTH
   */
  updateSheepPositions(sheepSpeed: number, wolfPosition: Coordinates, FIELD_WIDTH: number): void {
    let sheeps = this.getAllSheeps();
    for (let sheep of sheeps) {
      let direction: Direction = sheep.getNextDirection(sheep.getPosition, wolfPosition);
      sheep.move(sheepSpeed, FIELD_WIDTH, direction);
    }
  }


}
