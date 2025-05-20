import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hero } from './heroes.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (type) => Hero,
    (hero) => hero.flavors,
  )
  heroes: Hero[];
}
