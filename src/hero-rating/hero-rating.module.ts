import { Module } from '@nestjs/common';
import { HeroesRatingService } from './hero-rating.service';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  providers: [HeroesRatingService],
})
export class HeroesRatingModule {}
