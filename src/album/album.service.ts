import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const album = this.albumsRepository.create({ name, year, artistId });

    if (!album) {
      throw new BadRequestException('ERROR: invalid request body');
    }

    return this.albumsRepository.save(album);
  }

  findAll() {
    return this.albumsRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumExistCheck(id);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    await this.albumExistCheck(id);
    await this.albumsRepository.update(id, {
      name,
      year,
      artistId,
    });

    return await this.albumsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.albumExistCheck(id);
    await this.albumsRepository.delete(id);
  }

  async albumExistCheck(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(
        `ERROR: album with albumId = ${id} doesn't exist`,
      );
    }
    return album;
  }
}
