import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HeroesService } from '../service/heroes.service';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto as UpdateHeroesDto } from '../dto/update-hero.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.heroesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.heroesService.findOne('' + id);
  }

  @Post()
  create(@Body() body: CreateHeroDto) {
    return this.heroesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateHeroesDto) {
    return this.heroesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(id);
  }
}
