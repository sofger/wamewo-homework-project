import { Coordinates } from '../coordinates/coordinates.model';

export class Utils {
  /**
   * Generates random integer between 0 and @param max
   * @param max
   */
  public static getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }

  /**
   * Delays run by @param ms with promise
   * @param ms
   * add await before it in a async function
   */
  public static delay(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  /**
   * Calculates distance between two Coordinate
   * @param Coordinates1
   * @param Coordinates2
   */
  public static calcDistanceBetweenCoordinates(
    Coordinates1: Coordinates,
    Coordinates2: Coordinates,
  ): number {
    return Math.hypot(
      Coordinates1.x - Coordinates2.x,
      Coordinates1.y - Coordinates2.y,
    );
  }

  /**
   * generates random coordinate
   * @param FIELD_WIDTH
   */
  public static getRandomCoordinates(FIELD_WIDTH: number): Coordinates {
    return new Coordinates(
      Utils.getRandomInt(FIELD_WIDTH),
      Utils.getRandomInt(FIELD_WIDTH),
    );
  }
}
