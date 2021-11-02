import { Coordinates } from "../../coordinates/coordinates.model";
import { NotFoundException } from "@nestjs/common";
import { WolfService } from "./wolf.service";
import { WolfModel } from "./wolf.model";
import { SheepModel } from "../sheep/sheep.model";

describe("WolfServiceTest", () => {
  let wolfService: WolfService;

  beforeEach(() => {
    wolfService = new WolfService();
  });

  describe("Add new wolf", () => {
    it("should throw NotFoundException if no wolf created", () => {
      expect(() => wolfService.getWolf()).toThrow(NotFoundException);
    });

    it("should add a new created wolf", () => {
      let wolfMock = new WolfModel(2, new Coordinates(10, 10), 10);
      wolfService.addWolf(wolfMock);
      let wolf = wolfService.getWolf();
      expect(wolf).toBe(wolfMock);
    });
  });

  describe("update Wolf Size", () => {
    it("should update wolf size", () => {
      let wolfMock = new WolfModel(2, new Coordinates(10, 10), 10);
      wolfService.addWolf(wolfMock);
      let wolf = wolfService.getWolf();
      expect(wolf.size).toBe(10);
      wolfService.updateWolfSize(1);
      wolf = wolfService.getWolf();
      expect(wolf.size).toBe(11);
      wolfService.updateWolfSize(5);
      wolf = wolfService.getWolf();
      expect(wolf.size).toBe(16);
    });
    it("should throw exception with negative numbers", () => {
      let wolfMock = new WolfModel(2, new Coordinates(10, 10), 10);
      wolfService.addWolf(wolfMock);
      let wolf = wolfService.getWolf();
      expect(wolf.size).toBe(10);
      expect(() => wolfService.updateWolfSize(-5)).toThrow(RangeError);
    });
  });

  describe("get Closest Sheep", () => {
    it("should return closest sheep", () => {
      let wolfMock: WolfModel = new WolfModel(2, new Coordinates(10, 10), 10);
      wolfService.addWolf(wolfMock);
      let sheepMock1: SheepModel = new SheepModel(1, new Coordinates(11, 11));
      let sheepMock2: SheepModel = new SheepModel(2, new Coordinates(25, 25));
      let sheepMock3: SheepModel = new SheepModel(3, new Coordinates(50, 50));
      let sheepMocks = [sheepMock1, sheepMock2, sheepMock3];
      let closestSheep = wolfService.getClosestSheep(sheepMocks);
      expect(closestSheep).toBe(sheepMock1);
    });
    it("should throw NotFoundException exception if no sheeps provided", () => {
      let wolfMock: WolfModel = new WolfModel(2, new Coordinates(10, 10), 10);
      wolfService.addWolf(wolfMock);
      let sheepMocks = [];
      expect(() => wolfService.getClosestSheep(sheepMocks)).toThrow(NotFoundException);
    });
  });
});
