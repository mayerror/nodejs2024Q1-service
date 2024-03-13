import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { validate as isValidUUID } from 'uuid';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  findAll() {
    const tracks = this.trackService.findAll();
    const albums = this.albumService.findAll();
    const artists = this.artistService.findAll();
    return this.favsService.findAll(tracks, albums, artists);
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe())
  createTrack(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const track = this.trackService.findOne(id);
    if (track === undefined) {
      throw new NotFoundException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `ERROR: track with trackId = ${id} doesn't exist`,
      });
    }
    return this.favsService.createTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeTrack(@Param('id') id: string) {
    this.NotUuidCheck(id);
    if (!this.favsService.isTrackFav(id)) {
      this.NotFoundCheck(id);
    }
    this.favsService.removeTrack(id);
    return null;
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe())
  createAlbum(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const album = this.albumService.findOne(id);
    if (album === undefined) {
      throw new NotFoundException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `ERROR: album with albumId = ${id} doesn't exist`,
      });
    }
    return this.favsService.createAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    this.NotUuidCheck(id);
    if (!this.favsService.isAlbumFav(id)) {
      this.NotFoundCheck(id);
    }
    this.favsService.removeAlbum(id);
    return null;
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe())
  createArtist(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const artist = this.artistService.findOne(id);
    if (artist === undefined) {
      throw new NotFoundException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `ERROR: artist with albumId = ${id} doesn't exist`,
      });
    }
    return this.favsService.createArtist(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    this.NotUuidCheck(id);
    if (!this.favsService.isArtistFav(id)) {
      this.NotFoundCheck(id);
    }
    this.favsService.removeArtist(id);
    return null;
  }

  private NotUuidCheck(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `ERROR: artistId = ${id} is invalid (not uuid)`,
      });
    }
  }

  private NotFoundCheck(id: string) {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `ERROR: Id = ${id} is not favorite`,
    });
  }
}
