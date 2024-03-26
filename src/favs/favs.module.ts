import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favs } from './entities/fav.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favs]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
