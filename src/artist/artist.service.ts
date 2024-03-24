import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const artist = this.artistsRepository.create({ name, grammy });

    if (!artist) {
      throw new BadRequestException('ERROR: invalid request body');
    }

    return this.artistsRepository.save(artist);
  }

  findAll() {
    return this.artistsRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistExistCheck(id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;
    await this.artistExistCheck(id);
    await this.artistsRepository.update(id, {
      name,
      grammy,
    });

    return await this.artistsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.artistExistCheck(id);
    await this.artistsRepository.delete(id);
  }

  async artistExistCheck(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(
        `ERROR: artist with artistId = ${id} doesn't exist`,
      );
    }
    return artist;
  }
}
