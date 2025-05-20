import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Represents a relationship between a class and a database table.
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

  @Column()
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
