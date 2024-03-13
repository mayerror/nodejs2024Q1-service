import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { validate as isValidUUID } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const track = this.trackService.findOne(id);
    this.NotFoundCheck(track, id);
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    this.ExceptionsCheck(id);
    return this.trackService.update(id, updateTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.ExceptionsCheck(id);
    this.trackService.remove(id);
    return null;
  }

  private ExceptionsCheck(id: string) {
    this.NotUuidCheck(id);
    const track = this.trackService.findOne(id);
    this.NotFoundCheck(track, id);
  }

  private NotUuidCheck(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `ERROR: trackId = ${id} is invalid (not uuid)`,
      });
    }
  }

  private NotFoundCheck(track: Track | Partial<Track>, id: string) {
    if (track === undefined) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ERROR: track with trackId = ${id} doesn't exist`,
      });
    }
  }
}
