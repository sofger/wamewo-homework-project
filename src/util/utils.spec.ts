import { Utils } from "./utils";
import { Coordinates } from "../coordinates/coordinates.model";

describe("Utils test", () => {
  test.each`
    range | toBeLowerThan
    ${1}  | ${2}
    ${2}  | ${3}
    ${3}  | ${4}
    ${10} | ${11}
    ${8}  | ${9}
    `("returns random number lower number than $toBeLowerThan when $range as parameter", ({ range, toBeLowerThan }) => {
    expect(Utils.getRandomInt(range)).toBeLessThan(toBeLowerThan);
  });


  it("should delay 10 ms", async () => {
    await Utils.delay(10);
  });


  it("should calc Distance Between two Coordinates", () => {
    let mockCoordinate1: Coordinates = new Coordinates(10, 50);
    let mockCoordinate2: Coordinates = new Coordinates(20, 50);
    let result = Utils.calcDistanceBetweenCoordinates(mockCoordinate1, mockCoordinate2);
    expect(result).toBe(10);
  });


  it("should return a random Coordinate less than field size", () => {
    let resultCoordinate: Coordinates = Utils.getRandomCoordinates(10);
    expect(resultCoordinate.y).toBeLessThan(11);
    expect(resultCoordinate.x).toBeLessThan(11);
    resultCoordinate = Utils.getRandomCoordinates(5);
    expect(resultCoordinate.y).toBeLessThan(6);
    expect(resultCoordinate.x).toBeLessThan(6);
    resultCoordinate = Utils.getRandomCoordinates(3);
    expect(resultCoordinate.y).toBeLessThan(4);
    expect(resultCoordinate.x).toBeLessThan(4);
  });

});