import { Injectable, NotFoundException } from '@nestjs/common';
import { Hero } from '../entities/heroes.entity';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavor } from '../entities/flavor.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Event } from '../../events/entities/event.entity';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroesRepository: Repository<Hero>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.heroesRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const heroes = await this.heroesRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!heroes) {
      throw new NotFoundException(`Hero #${id} not found`);
    }
    return heroes;
  }

  async create(createHeroDto: CreateHeroDto) {
    const heroes = this.heroesRepository.create({
      ...createHeroDto,
    });
    return this.heroesRepository.save(heroes);
  }

  async update(id: string, updateHeroDto: UpdateHeroDto) {

    const hero = await this.heroesRepository.preload({
      id: +id,
      ...updateHeroDto,
    });
    if (!hero) {
      throw new NotFoundException(`Hero #${id} not found`);
    }
    return this.heroesRepository.save(hero);
  }

  async remove(id: string) {
    const heroes = await this.findOne(id);
    return this.heroesRepository.remove(heroes);
  }

  async recommendHero(hero: Hero) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      hero.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_heroes';
      recommendEvent.type = 'heroes';
      recommendEvent.payload = { heroId: hero.id };

      await queryRunner.manager.save(hero);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('Error during transaction:', err);
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    }); // 👈 notice the "where"
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
