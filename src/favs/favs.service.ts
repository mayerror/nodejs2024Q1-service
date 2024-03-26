import { Injectable, NotFoundException } from '@nestjs/common';
import { Favs } from './entities/fav.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favs)
    private favsRepository: Repository<Favs>,
  ) {
    this.initializeFavs();
  }

  async findAll(tracks: Track[], albums: Album[], artists: Artist[]) {
    const favs = await this.favsRepository.find();
    const favsTracks = tracks.filter((track) =>
      favs[0].tracks.includes(track.id),
    );
    const favsAlbums = albums.filter((album) =>
      favs[0].albums.includes(album.id),
    );
    const favArtists = artists.filter((artist) =>
      favs[0].artists.includes(artist.id),
    );
    return {
      artists: favArtists,
      albums: favsAlbums,
      tracks: favsTracks,
    };
  }

  async createTrack(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    if (!favRecord) {
      throw new NotFoundException('ERROR: No favorites record found');
    }
    favRecord.tracks.push(id);
    await this.favsRepository.save(favRecord);
    return 'The track has been successfully added to the collection';
  }

  async removeTrack(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    if (!favRecord) {
      throw new NotFoundException('ERROR: No favorites record found');
    }
    const index = favRecord.tracks.findIndex((track) => track === id);
    if (index !== -1) {
      favRecord.tracks.splice(index, 1);
      await this.favsRepository.save(favRecord);
    }
    return 'The track has been successfully removed from the collection';
  }

  async isTrackFav(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    return favRecord.tracks.includes(id);
  }

  async createAlbum(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    if (!favRecord) {
      throw new NotFoundException('ERROR: No favorites record found');
    }
    favRecord.albums.push(id);
    await this.favsRepository.save(favRecord);
    return 'The album has been successfully added to the collection';
  }

  async removeAlbum(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    if (!favRecord) {
      throw new NotFoundException('ERROR: No favorites record found');
    }
    const index = favRecord.albums.findIndex((album) => album === id);
    if (index !== -1) {
      favRecord.albums.splice(index, 1);
      await this.favsRepository.save(favRecord);
    }
    return 'The album has been successfully removed from the collection';
  }

  async isAlbumFav(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    return favRecord.albums.includes(id);
  }

  async createArtist(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    if (!favRecord) {
      throw new NotFoundException('ERROR: No favorites record found');
    }
    favRecord.artists.push(id);
    await this.favsRepository.save(favRecord);
    return 'The artist has been successfully added to the collection';
  }

  async removeArtist(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    if (!favRecord) {
      throw new NotFoundException('ERROR: No favorites record found');
    }
    const index = favRecord.artists.findIndex((artist) => artist === id);
    if (index !== -1) {
      favRecord.artists.splice(index, 1);
      await this.favsRepository.save(favRecord);
    }
    return 'The artist has been successfully removed from the collection';
  }

  async isArtistFav(id: string) {
    const favRecord = (await this.favsRepository.find())[0];
    return favRecord.artists.includes(id);
  }

  async initializeFavs() {
    const count = await this.favsRepository.count();
    if (count === 0) {
      const favs = new Favs();
      favs.tracks = [];
      favs.albums = [];
      favs.artists = [];
      await this.favsRepository.save(favs);
    }
  }
}
