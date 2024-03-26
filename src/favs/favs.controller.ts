import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  HttpCode,
  UnprocessableEntityException,
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
  async findAll() {
    const tracks = await this.trackService.findAll();
    const albums = await this.albumService.findAll();
    const artists = await this.artistService.findAll();
    return this.favsService.findAll(tracks, albums, artists);
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe())
  async createTrack(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const track = await this.trackService.findOneWitoutCheck(id);
    if (!track) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `ERROR: track with trackId = ${id} doesn't exist`,
      });
    }
    return await this.favsService.createTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeTrack(@Param('id') id: string) {
    this.NotUuidCheck(id);
    if (!(await this.favsService.isTrackFav(id))) {
      this.NotFoundCheck(id);
    }
    return await this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe())
  async createAlbum(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const album = await this.albumService.findOneWitoutCheck(id);
    if (!album) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `ERROR: album with albumId = ${id} doesn't exist`,
      });
    }
    return await this.favsService.createAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string) {
    this.NotUuidCheck(id);
    if (!(await this.favsService.isAlbumFav(id))) {
      this.NotFoundCheck(id);
    }
    return await this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe())
  async createArtist(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const artist = await this.artistService.findOneWitoutCheck(id);
    if (!artist) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `ERROR: artist with albumId = ${id} doesn't exist`,
      });
    }
    return await this.favsService.createArtist(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string) {
    this.NotUuidCheck(id);
    if (!(await this.favsService.isArtistFav(id))) {
      this.NotFoundCheck(id);
    }
    return await this.favsService.removeArtist(id);
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
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: `ERROR: Id = ${id} is not favorite`,
    });
  }
}
