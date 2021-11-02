import { Injectable, NotFoundException } from "@nestjs/common";
import { WolfModel } from "./wolf.model";
import { SheepModel } from "../sheep/sheep.model";
import { Utils } from "../../util/utils";

@Injectable()
export class WolfService {
  private wolf: WolfModel;

  /**
   * adds new wolf
   */
  addWolf(wolf: WolfModel): void {
    this.wolf = wolf;
  }

  /**
   * returns wolf
   */
  getWolf() {
    if (this.wolf) {
      return this.wolf;
    } else {
      throw new NotFoundException("No wolf defined");
    }
  }

  /**
   * returns sheep if it can be removed, if no match returns null
   * @param sheeps
   */
  getSheepIfWolfCanConsumeIt(sheeps: SheepModel[]): any {
    let closestSheep = this.getClosestSheep(sheeps);
    if (Utils.calcDistanceBetweenCoordinates(closestSheep.getPosition, this.wolf.getPosition) < this.wolf.size) {
      closestSheep.dead = true;
      return closestSheep;
    }
    return null;
  }

  /**
   * Updates wolf x and y coordinates by wolfSpeed in the direction according to closest sheep position
   * @param wolfSpeed
   * @param sheeps
   * @param FIELD_WIDTH
   */
  updateWolfPosition(wolfSpeed, sheeps: SheepModel[], FIELD_WIDTH): void {
    let closestSheep = this.getClosestSheep(sheeps);
    let nextDirection = this.getWolf().getNextDirection(closestSheep.getPosition, this.getWolf().getPosition);
    this.getWolf().move(wolfSpeed, FIELD_WIDTH, nextDirection);

  }

  /**
   * updates wolf size by param
   * @param wolfSizeIncremental
   */
  updateWolfSize(wolfSizeIncremental): void {
    if (wolfSizeIncremental > 0) {
      this.getWolf().size += wolfSizeIncremental;
    } else throw new RangeError("Incremental must be a positive integer");
  }

  /**
   * returns closest sheep
   * @param sheeps
   * @private
   */
  public getClosestSheep(sheeps: SheepModel[]): SheepModel {
    if (sheeps.length > 0) {
      let minDistanceSheep = sheeps[0];
      let minDistance = Utils.calcDistanceBetweenCoordinates(sheeps[0].getPosition, this.wolf.getPosition);
      for (let sheep of sheeps) {
        let sheepDistance = Utils.calcDistanceBetweenCoordinates(sheep.getPosition, this.wolf.getPosition);
        if (sheepDistance < minDistance) {
          minDistance = sheepDistance;
          minDistanceSheep = sheep;
        }
      }
      return minDistanceSheep;
    } else {
      throw new NotFoundException("No sheeps are available");
    }


  }

}
