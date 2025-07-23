import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  realName: string;

  @Column()
  alias: string;

  @Column()
  alignment: string;

  @Column()
  team: string;

  @Column('text', { array: true })
  powers: string[];

  @Column()
  origin: string;

  @Column()
  firstAppearance: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  recommendations: number;
}
