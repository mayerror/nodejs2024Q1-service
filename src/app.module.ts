import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'doc'), // 'doc' это директория, где находится 'api.yaml'
    }),
    FavsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
