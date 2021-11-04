import { SheepService } from './sheep.service';
import { Coordinates } from '../../coordinates/coordinates.model';
import { SheepModel } from './sheep.model';
import { NotFoundException } from '@nestjs/common';

describe('SheepServiceTest', () => {
  let sheepService: SheepService;

  beforeEach(() => {
    sheepService = new SheepService();
  });

  describe('Add new sheep', () => {
    test('sheeps collection should be empty', () => {
      let sheeps = sheepService.getAllSheeps();
      expect(sheeps).toStrictEqual([]);
    });

    it('should add a new sheep', () => {
      let mockSheep = new SheepModel(1, new Coordinates(5, 5));
      sheepService.addSheep(mockSheep);
      let sheeps = sheepService.getAllSheeps();
      expect(sheeps.length).toBe(1);
      sheepService.addSheep(mockSheep);
      sheeps = sheepService.getAllSheeps();
      expect(sheeps.length).toBe(2);
    });
  });

  describe('get sheep by id', () => {
    it('should return  the correct sheep', () => {
      let mockSheep = new SheepModel(4, new Coordinates(5, 5));
      sheepService.addSheep(mockSheep);
      let sheep = sheepService.findSheep(4);
      expect(sheep).toBe(mockSheep);
    });

    it('should throw NotFoundException if sheep is not available', () => {
      let mockSheep = new SheepModel(4, new Coordinates(5, 5));
      sheepService.addSheep(mockSheep);
      expect(() => sheepService.findSheep(3)).toThrow(NotFoundException);
    });
  });

  describe('get all sheeps', () => {
    it('should return all the sheeps', () => {
      let mockSheep1 = new SheepModel(1, new Coordinates(5, 5));
      let mockSheep2 = new SheepModel(2, new Coordinates(6, 6));
      let mockSheep3 = new SheepModel(3, new Coordinates(7, 7));
      sheepService.addSheep(mockSheep1);
      sheepService.addSheep(mockSheep2);
      sheepService.addSheep(mockSheep3);
      let sheeps = sheepService.getAllSheeps();
      expect(sheeps.length).toBe(3);
    });
  });

  describe('remove a sheep', () => {
    it('should remove a sheep', () => {
      let mockSheep1 = new SheepModel(1, new Coordinates(5, 5));
      let mockSheep2 = new SheepModel(2, new Coordinates(6, 6));
      sheepService.addSheep(mockSheep1);
      sheepService.addSheep(mockSheep2);
      let sheeps = sheepService.getAllSheeps();
      expect(sheeps.length).toBe(2);
      sheepService.removeSheep(mockSheep2);
      sheeps = sheepService.getAllSheeps();
      expect(sheeps.length).toBe(1);
    });
  });

  describe('update Sheep Positions', () => {
    it('should update all sheep positions', () => {
      let mockSheep1 = new SheepModel(1, new Coordinates(5, 10));
      let mockSheep2 = new SheepModel(2, new Coordinates(6, 10));
      let mockSheep3 = new SheepModel(3, new Coordinates(7, 10));
      sheepService.addSheep(mockSheep1);
      sheepService.addSheep(mockSheep2);
      sheepService.addSheep(mockSheep3);
      let coordinates = new Coordinates(10, 10);
      sheepService.updateSheepPositions(1, coordinates, 100);
      mockSheep1 = sheepService.findSheep(1);
      mockSheep2 = sheepService.findSheep(2);
      mockSheep3 = sheepService.findSheep(3);
      expect(mockSheep1.getPosition.x).toBe(4);
      expect(mockSheep2.getPosition.x).toBe(5);
      expect(mockSheep3.getPosition.x).toBe(6);
    });
  });
});
