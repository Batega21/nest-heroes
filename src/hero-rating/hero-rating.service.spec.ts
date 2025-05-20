import { Test, TestingModule } from '@nestjs/testing';
import { HeroesRatingService } from './hero-rating.service';

describe('CoffeeRatingService', () => {
  let service: HeroesRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroesRatingService],
    }).compile();

    service = module.get<HeroesRatingService>(HeroesRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
