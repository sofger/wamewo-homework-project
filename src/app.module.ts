import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { WolfModule } from './colony/wolf/wolf.module';
import { SheepModule } from './colony/sheep/sheep.module';

@Module({
  imports: [SheepModule, WolfModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
