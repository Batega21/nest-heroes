import { Injectable, NotFoundException } from '@nestjs/common';
import { Heroes } from '../entities/heroes.entity';
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
    @InjectRepository(Heroes)
    private readonly heroesRepository: Repository<Heroes>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.heroesRepository.find({
      relations: {
        flavors: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const heroes = await this.heroesRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        flavors: true,
      },
    });
    if (!heroes) {
      throw new NotFoundException(`Hero #${id} not found`);
    }
    return heroes;
  }

  async create(createHeroDto: CreateHeroDto) {
    const flavors = await Promise.all(
      createHeroDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const heroes = this.heroesRepository.create({
      ...createHeroDto,
      flavors,
    });
    return this.heroesRepository.save(heroes);
  }

  async update(id: string, updateHeroDto: UpdateHeroDto) {
    const flavors =
      updateHeroDto.flavors &&
      (await Promise.all(
        updateHeroDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const hero = await this.heroesRepository.preload({
      id: +id,
      ...updateHeroDto,
      flavors,
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

  async recommendHero(hero: Heroes) {
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
