import { IAlbum } from 'src/album/entities/IAlbum';
import { ITrack } from 'src/track/entities/ITrack';
import { Track } from 'src/track/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany('Track', 'artist')
  tracks: ITrack[];

  @OneToMany('Album', 'artist')
  albums: IAlbum[];
}
