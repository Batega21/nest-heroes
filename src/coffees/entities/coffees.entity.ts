import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

// Represents a relationship between a class and a database table.
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable() // Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (type) => Flavor,
    (flavor) => flavor.coffees, // what is "coffee" within the Flavor Entity
    {
      cascade: true, // or optionally just insert or update ['insert']
    },
  )
  flavors: Flavor[];
}
