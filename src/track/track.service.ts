import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const track = this.tracksRepository.create({
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });

    if (!track) {
      throw new BadRequestException('ERROR: invalid request body');
    }

    return this.tracksRepository.save(track);
  }

  findAll() {
    return this.tracksRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackExistCheck(id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;

    await this.trackExistCheck(id);
    await this.tracksRepository.update(id, {
      name,
      artistId,
      albumId,
      duration,
    });

    return await this.tracksRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.trackExistCheck(id);
    await this.tracksRepository.delete(id);
  }

  async trackExistCheck(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(
        `ERROR: track with trackId = ${id} doesn't exist`,
      );
    }
    return track;
  }
}
