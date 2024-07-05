import { Module } from '@nestjs/common';
import { CoffeesController } from './controller/coffees.controller';
import { CoffeesService } from './service/coffees.service';

@Module({
  controllers: [CoffeesController],
  exports: [],
  imports: [],
  providers: [CoffeesService],
})
export class CoffeesModule {}
