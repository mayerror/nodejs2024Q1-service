import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { Favs } from './entities/fav.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class FavsService {
  private readonly favs: Favs = {
    tracks: [],
    albums: [],
    artists: [],
  };

  findAll(tracks: Track[], albums: Album[], artists: Artist[]) {
    const favsTracks = tracks.filter((track) =>
      this.favs.tracks.includes(track.id),
    );
    const favsAlbums = albums.filter((album) =>
      this.favs.albums.includes(album.id),
    );
    const favArtists = artists.filter((artist) =>
      this.favs.artists.includes(artist.id),
    );
    return {
      artists: favArtists,
      albums: favsAlbums,
      tracks: favsTracks,
    };
  }

  createTrack(id: string) {
    this.favs.tracks.push(id);
    return 'The track has been successfully added to the collection';
  }

  removeTrack(id: string) {
    const index = this.favs.tracks.findIndex((track) => track === id);
    this.favs.tracks.splice(index, 1);
  }

  isTrackFav(id: string) {
    return this.favs.tracks.includes(id);
  }

  createAlbum(id: string) {
    this.favs.albums.push(id);
    return 'The album has been successfully added to the collection';
  }

  removeAlbum(id: string) {
    const index = this.favs.albums.findIndex((album) => album === id);
    this.favs.albums.splice(index, 1);
  }

  isAlbumFav(id: string) {
    return this.favs.albums.includes(id);
  }

  createArtist(id: string) {
    this.favs.artists.push(id);
    return 'The artist has been successfully added to the collection';
  }

  removeArtist(id: string) {
    const index = this.favs.artists.findIndex((artist) => artist === id);
    this.favs.artists.splice(index, 1);
  }

  isArtistFav(id: string) {
    return this.favs.artists.includes(id);
  }
}
