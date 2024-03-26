import { Exclude } from 'class-transformer';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @Column({
    type: 'bigint',
  })
  createdAt: number; // timestamp of creation

  @Column({
    type: 'bigint',
  })
  updatedAt: number; // timestamp of last update
}
