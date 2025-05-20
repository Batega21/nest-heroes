import { Module } from '@nestjs/common';
import { HeroesController } from './controller/heroes.controller';
import { HeroesService } from './service/heroes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entities/heroes.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';

@Module({
  controllers: [HeroesController],
  exports: [HeroesService],
  imports: [TypeOrmModule.forFeature([Hero, Flavor, Event])],
  providers: [HeroesService],
})
export class HeroesModule {}
