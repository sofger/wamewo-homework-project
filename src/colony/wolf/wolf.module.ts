import { Module } from "@nestjs/common";
import { WolfService } from "./wolf.service";
import { WolfController } from "./wolf.controller";

@Module({
  controllers: [WolfController],
  providers: [WolfService]
})
export class WolfModule {
}
