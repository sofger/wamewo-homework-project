import { Coordinates } from '../../coordinates/coordinates.model';
import { Animal } from '../Animal.abstract';

export class SheepModel extends Animal {
  private _isDead: boolean;

  constructor(sheepId: number, coordinate: Coordinates) {
    super(sheepId, coordinate);
    this._isDead = false;
  }

  get dead(): boolean {
    return this._isDead;
  }

  set dead(value: boolean) {
    this._isDead = value;
  }
}
