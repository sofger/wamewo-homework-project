import { Coordinates } from '../coordinates/coordinates.model';

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
  getNextDirection(sheepCoordinates: Coordinates, wolfPosition: Coordinates) {
    const dX = sheepCoordinates.x - wolfPosition.x;
    const dY = sheepCoordinates.y - wolfPosition.y;
    return Math.atan2(dY, dX);
  }

  /**
   * Moves animal
   * @param speed with speed
   * @param FIELD_SIZE between 0 and field size
   * @param direction in direction
   */
  move(speed, FIELD_SIZE: number, direction: number): void {
    this.getPosition.x += speed * Math.cos(direction);
    this.getPosition.y += speed * Math.sin(direction);
  }
}
