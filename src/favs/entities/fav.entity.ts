import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Favs {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column('simple-array')
  artists: string[]; // favorite artists ids

  @Column('simple-array')
  albums: string[]; // favorite albums ids

  @Column('simple-array')
  tracks: string[]; // favorite tracks ids
}
