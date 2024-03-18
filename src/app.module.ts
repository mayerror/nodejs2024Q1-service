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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
    }),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'doc'),
    }),
    FavsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
