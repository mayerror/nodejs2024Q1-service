import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  Put,
  ValidationPipe,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { validate as isValidUUID } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const album = this.albumService.findOne(id);
    this.NotFoundCheck(album, id);
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    this.ExceptionsCheck(id);
    return this.albumService.update(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.ExceptionsCheck(id);
    return this.albumService.remove(id);
  }

  private ExceptionsCheck(id: string) {
    this.NotUuidCheck(id);
    const album = this.albumService.findOne(id);
    this.NotFoundCheck(album, id);
  }

  private NotUuidCheck(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `ERROR: albumId = ${id} is invalid (not uuid)`,
      });
    }
  }

  private NotFoundCheck(album: Album | Partial<Album>, id: string) {
    if (album === undefined) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ERROR: album with albumId = ${id} doesn't exist`,
      });
    }
  }
}
