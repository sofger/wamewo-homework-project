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

  move(speed, FIELD_WIDTH: number, direction: Direction): void {
    switch (direction) {
      case Direction.UP_RIGHT:
        if (this.getPosition.x > 0 && this.getPosition.y < FIELD_WIDTH) {
          this.getPosition.x -= speed;
          this.getPosition.y += speed;
        }
        break;
      case Direction.UP_LEFT:
        if (this.getPosition.x > 0 && this.getPosition.y > 0) {
          this.getPosition.x -= speed;
          this.getPosition.y -= speed;
        }
        break;

      case Direction.DOWN_LEFT:
        if (this.getPosition.x > 0 && this.getPosition.y < FIELD_WIDTH) {
          this.getPosition.x -= speed;
          this.getPosition.y += speed;
        }
        break;
      case Direction.DOWN_RIGHT:
        if (this.getPosition.x < FIELD_WIDTH && this.getPosition.y < FIELD_WIDTH) {
          this.getPosition.y += speed;
          this.getPosition.x += speed;
        }
        break;
      case Direction.LEFT:
        if (this.getPosition.x > 1) {
          this.getPosition.x -= speed;
        }
        break;
      case Direction.RIGHT:
        if (this.getPosition.x < FIELD_WIDTH) {
          this.getPosition.x += speed;
        }
        break;
      case Direction.UP:
        if (this.getPosition.y > 0) {
          this.getPosition.y -= speed;
        }
        break;
      case Direction.DOWN:
        if (this.getPosition.y < FIELD_WIDTH) {
          this.getPosition.y += speed;
        }
        break;
    }
  }

}
