import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { validate as isValidUUID } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const artist = this.artistService.findOne(id);
    this.NotFoundCheck(artist, id);
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    this.ExceptionsCheck(id);
    return this.artistService.update(id, updateArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.ExceptionsCheck(id);
    this.artistService.remove(id);
    return null;
  }

  private ExceptionsCheck(id: string) {
    this.NotUuidCheck(id);
    const artist = this.artistService.findOne(id);
    this.NotFoundCheck(artist, id);
  }

  private NotUuidCheck(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `ERROR: artistId = ${id} is invalid (not uuid)`,
      });
    }
  }

  private NotFoundCheck(artist: Artist | Partial<Artist>, id: string) {
    if (artist === undefined) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ERROR: artist with artistId = ${id} doesn't exist`,
      });
    }
  }
}
