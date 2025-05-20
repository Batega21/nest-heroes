import { Injectable } from '@nestjs/common';
import { HeroesService } from 'src/heroes/service/heroes.service';

@Injectable()
export class HeroesRatingService {
  constructor(private readonly heroesService: HeroesService) {}
}
