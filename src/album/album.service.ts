import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    this.albums.push(album);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find((album) => album.id === id);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  remove(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
  }
}
