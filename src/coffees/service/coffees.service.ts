import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from '../interfaces/coffees';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Coffee #1',
      brand: 'Brand #1',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Coffee #2',
      brand: 'Brand #2',
      flavors: ['chocolate', 'caramel'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item: Coffee) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      this.coffees.map((item: Coffee) => {
        if (item.id === +id) {
          return {
            ...item,
            ...updateCoffeeDto,
          };
        }
        return item;
      });
    } else {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
  }

  remove(id: string) {
    const coffeeIndex = this.findOne(id);
    if (coffeeIndex) {
      this.coffees = this.coffees.filter((item: Coffee) => item.id !== +id);
    } else {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
  }
}
