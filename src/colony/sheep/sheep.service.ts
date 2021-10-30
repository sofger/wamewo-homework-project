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
  addSheep(sheepId: number, coordinate: Coordinates) {
    const newSheep = new SheepModel(sheepId, coordinate);
    this.sheeps.push(newSheep);
  }

  /**
   * returns all sheeps
   */
  getAllSheeps() {
    return [...this.sheeps];
  }

  /**
   * removes sheep
   * @param sheep
   */
  removeSheep(sheep) {
    this.sheeps.splice(this.sheeps.indexOf(sheep), 1);
  }

  /**
   * finds sheep by id
   * @param sheepId
   */
  findSheep(sheepId: number) {
    const sheep = this.sheeps.find(sheep => sheep.id === sheepId);
    if (!sheep) {
      throw new NotFoundException("Sheep not found");
    }
    return sheep;
  }

  /**
   * returns enum Direction according to wolf position
   * @param sheepId
   * @param wolfPosition
   */
  getNextDirection(sheepId: number, wolfPosition: Coordinates): Direction {
    let sheep = this.findSheep(sheepId);
    let wolfIsDownRight = sheep.getPosition.x < wolfPosition.x && sheep.getPosition.y < wolfPosition.y;
    let wolfIsDownLeft = sheep.getPosition.x > wolfPosition.x && sheep.getPosition.y < wolfPosition.y;
    let wolfIsUpRight = sheep.getPosition.x < wolfPosition.x && sheep.getPosition.y > wolfPosition.y;
    let wolfIsUpLeft = sheep.getPosition.x > wolfPosition.x && sheep.getPosition.y > wolfPosition.y;
    let wolfIsStraightDown = sheep.getPosition.x === wolfPosition.x && sheep.getPosition.y < wolfPosition.y;
    let wolfIsStraightUp = sheep.getPosition.x === wolfPosition.x && sheep.getPosition.y > wolfPosition.y;
    let wolfIsStraightLeft = sheep.getPosition.x > wolfPosition.x && sheep.getPosition.y === wolfPosition.y;
    let wolfIsStraightRight = sheep.getPosition.x < wolfPosition.x && sheep.getPosition.y === wolfPosition.y;

    // <-----------------up------------------>
    if (wolfIsDownRight) {
      return Direction.UP_LEFT;
    }
    if (wolfIsDownLeft) {
      return Direction.UP_RIGHT;
    }
    if (wolfIsStraightDown) {
      return Direction.UP;
    }
    // <-----------------down------------------>
    if (wolfIsUpRight) {
      return Direction.DOWN_LEFT;
    }
    if (wolfIsUpLeft) {
      return Direction.DOWN_RIGHT;
    }
    if (wolfIsStraightUp) {
      return Direction.DOWN;
    }
    // <-----------------Right------------------>
    if (wolfIsStraightLeft) {
      return Direction.RIGHT;
    }
    // <-----------------Left------------------>
    if (wolfIsStraightRight) {
      return Direction.LEFT;
    }
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
      let direction: Direction = this.getNextDirection(sheep.id, wolfPosition);
      sheep.move(sheepSpeed, FIELD_WIDTH, direction);
    }
  }


}
