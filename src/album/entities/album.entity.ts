import { IArtist } from 'src/artist/entities/IArtist';
import { ITrack } from 'src/track/entities/ITrack';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @OneToMany('Track', 'artist')
  tracks: ITrack[];

  @ManyToOne('Artist', 'albums', { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: IArtist;
}
