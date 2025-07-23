import { Module } from '@nestjs/common';
import { HeroesRatingService } from './hero-rating.service';
import { HeroesModule } from 'src/heroes/heroes.module';

@Module({
  imports: [HeroesModule],
  providers: [HeroesRatingService],
})
export class HeroesRatingModule {}
