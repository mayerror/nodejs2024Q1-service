import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

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
