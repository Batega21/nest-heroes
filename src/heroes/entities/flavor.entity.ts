import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Heroes } from './heroes.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (type) => Heroes,
    (hero) => hero.flavors,
  )
  heroes: Heroes[];
}
