import { Animal } from './Animal.abstract';
import { Coordinates } from '../coordinates/coordinates.model';
import { WolfModel } from './wolf/wolf.model';
import { Direction } from '../coordinates/direction.enum';

describe('get next direction test', () => {
  let mockAnimal: Animal = new WolfModel(2, new Coordinates(10, 10), 10);
  let mockCoordinate1: Coordinates;
  let mockCoordinate2: Coordinates;

  it('should return Direction left', () => {
    mockCoordinate1 = new Coordinates(5, 10);
    mockCoordinate2 = new Coordinates(15, 10);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.LEFT);
  });

  it('should return Direction right', () => {
    mockCoordinate1 = new Coordinates(20, 10);
    mockCoordinate2 = new Coordinates(15, 10);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.RIGHT);
  });

  it('should return Direction up', () => {
    mockCoordinate1 = new Coordinates(10, 10);
    mockCoordinate2 = new Coordinates(10, 20);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.UP);
  });

  it('should return Direction down', () => {
    mockCoordinate1 = new Coordinates(10, 20);
    mockCoordinate2 = new Coordinates(10, 10);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.DOWN);
  });

  it('should return Direction up right', () => {
    mockCoordinate1 = new Coordinates(20, 8);
    mockCoordinate2 = new Coordinates(10, 10);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.UP_RIGHT);
  });

  it('should return Direction up left', () => {
    mockCoordinate1 = new Coordinates(10, 8);
    mockCoordinate2 = new Coordinates(20, 10);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.UP_LEFT);
  });

  it('should return Direction down right', () => {
    mockCoordinate1 = new Coordinates(20, 10);
    mockCoordinate2 = new Coordinates(10, 8);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.DOWN_RIGHT);
  });

  it('should return Direction down left', () => {
    mockCoordinate1 = new Coordinates(10, 10);
    mockCoordinate2 = new Coordinates(20, 8);
    let resultDirection: Direction = mockAnimal.getNextDirection(
      mockCoordinate1,
      mockCoordinate2,
    );
    expect(resultDirection).toStrictEqual(Direction.DOWN_LEFT);
  });
});

describe('move test', () => {
  let mockAnimal: Animal = new WolfModel(2, new Coordinates(10, 10), 10);

  it('should move animal to Direction left', () => {
    mockAnimal.move(1, 100, Direction.LEFT);
    expect(mockAnimal.getPosition.x).toBe(9);
    expect(mockAnimal.getPosition.y).toBe(10);
  });

  it('should move animal to Direction right', () => {
    mockAnimal.move(1, 100, Direction.RIGHT);
    expect(mockAnimal.getPosition.x).toBe(10);
    expect(mockAnimal.getPosition.y).toBe(10);
  });

  it('should move animal to Direction up', () => {
    mockAnimal.move(2, 100, Direction.UP);
    expect(mockAnimal.getPosition.x).toBe(10);
    expect(mockAnimal.getPosition.y).toBe(8);
  });

  it('should move animal to Direction down', () => {
    mockAnimal.move(4, 100, Direction.DOWN);
    expect(mockAnimal.getPosition.x).toBe(10);
    expect(mockAnimal.getPosition.y).toBe(12);
  });

  it('should move animal to Direction up right', () => {
    mockAnimal.move(2, 100, Direction.UP_RIGHT);
    expect(mockAnimal.getPosition.x).toBe(12);
    expect(mockAnimal.getPosition.y).toBe(10);
  });

  it('should move animal to Direction up left', () => {
    mockAnimal.move(2, 100, Direction.UP_LEFT);
    expect(mockAnimal.getPosition.x).toBe(10);
    expect(mockAnimal.getPosition.y).toBe(8);
  });

  it('should move animal to Direction down left', () => {
    mockAnimal.move(2, 100, Direction.DOWN_LEFT);
    expect(mockAnimal.getPosition.x).toBe(8);
    expect(mockAnimal.getPosition.y).toBe(10);
  });

  it('should move animal to Direction down right', () => {
    mockAnimal.move(2, 100, Direction.DOWN_RIGHT);
    expect(mockAnimal.getPosition.x).toBe(10);
    expect(mockAnimal.getPosition.y).toBe(12);
  });
});
