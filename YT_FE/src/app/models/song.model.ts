import { Playlist } from './playlists.model';
import { Genre } from './genre.model';
import { Artist } from './artist.model';
export class Song {
  constructor(
    public songId?: number,
    public title?: string,
    public youtubeID?: string,
    public genreId?: number,
    public genre?: Genre,
    public artists?: Artist[],
    public report?: null,
    public playlistsSongs?: Playlist[],
    public artistsSongs?: Artist[]
  ) {}
}
