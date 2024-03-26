import { IAlbum } from 'src/album/entities/IAlbum';
import { IArtist } from 'src/artist/entities/IArtist';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  @ManyToOne('Artist', 'tracks', { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: IArtist;

  @ManyToOne('Album', 'tracks', { onDelete: 'SET NULL' })
  @JoinColumn()
  album: IAlbum;
}
