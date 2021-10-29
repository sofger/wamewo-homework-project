import { Module } from "@nestjs/common";

import { SheepService } from "./sheep.service";
import { SheepController } from "./sheep.controller";


@Module({
  controllers: [SheepController],
  providers: [SheepService]
})

export class SheepModule {
}
