import { Coordinates } from "../../coordinates/coordinates.model";
import { Animal } from "../Animal.abstract";

export class WolfModel extends Animal {
  constructor(id: number, coordinate: Coordinates, size: number) {
    super(id, coordinate);
    this._size = size;
  }

  private _size: number;

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

}