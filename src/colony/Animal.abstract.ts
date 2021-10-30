import { Coordinates } from "../coordinates/coordinates.model";
import { Direction } from "../coordinates/direction.enum";

export abstract class Animal {
  protected _position: Coordinates;

  protected constructor(id: number, position: Coordinates) {
    this._id = id;
    this._position = position;
  }

  protected _id: number;

  get id(): number {
    return this._id;
  }

  get getPosition(): Coordinates {
    return this._position;
  }

  set setPosition(value: Coordinates) {
    this._position = value;
  }


  /**
   * returns enum Direction according to sheep and wolf position
   * @param sheepCoordinates sheep position
   * @param wolfPosition wolf position
   */
  getNextDirection(sheepCoordinates: Coordinates, wolfPosition: Coordinates): Direction {
    let wolfIsDownRight = sheepCoordinates.x < wolfPosition.x && sheepCoordinates.y < wolfPosition.y;
    let wolfIsDownLeft = sheepCoordinates.x > wolfPosition.x && sheepCoordinates.y < wolfPosition.y;
    let wolfIsUpRight = sheepCoordinates.x < wolfPosition.x && sheepCoordinates.y > wolfPosition.y;
    let wolfIsUpLeft = sheepCoordinates.x > wolfPosition.x && sheepCoordinates.y > wolfPosition.y;
    let wolfIsStraightDown = sheepCoordinates.x === wolfPosition.x && sheepCoordinates.y < wolfPosition.y;
    let wolfIsStraightUp = sheepCoordinates.x === wolfPosition.x && sheepCoordinates.y > wolfPosition.y;
    let wolfIsStraightLeft = sheepCoordinates.x > wolfPosition.x && sheepCoordinates.y === wolfPosition.y;
    let wolfIsStraightRight = sheepCoordinates.x < wolfPosition.x && sheepCoordinates.y === wolfPosition.y;

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
   * Moves animal
   * @param speed with speed
   * @param FIELD_SIZE between 0 and field size
   * @param direction in direction
   */
  move(speed, FIELD_SIZE: number, direction: Direction): void {
    switch (direction) {
      case Direction.UP_RIGHT:
        if (this.getPosition.y > 0 && this.getPosition.x < FIELD_SIZE) {
          this.getPosition.y -= speed;
          this.getPosition.x += speed;
        }
        break;
      case Direction.UP_LEFT:
        if (this.getPosition.y > 0 && this.getPosition.x > 0) {
          this.getPosition.y -= speed;
          this.getPosition.x -= speed;
        }
        break;

      case Direction.DOWN_LEFT:
        if (this.getPosition.y < FIELD_SIZE && this.getPosition.x > 0) {
          this.getPosition.y += speed;
          this.getPosition.x -= speed;
        }
        break;
      case Direction.DOWN_RIGHT:
        if (this.getPosition.y < FIELD_SIZE && this.getPosition.x < FIELD_SIZE) {
          this.getPosition.y += speed;
          this.getPosition.x += speed;
        }
        break;
      case Direction.LEFT:
        if (this.getPosition.x > 0) {
          this.getPosition.x -= speed;
        }
        break;
      case Direction.RIGHT:
        if (this.getPosition.x < FIELD_SIZE) {
          this.getPosition.x += speed;
        }
        break;
      case Direction.UP:
        if (this.getPosition.y > 0) {
          this.getPosition.y -= speed;
        }
        break;
      case Direction.DOWN:
        if (this.getPosition.y < FIELD_SIZE) {
          this.getPosition.y += speed;
        }
        break;
    }
  }

}
