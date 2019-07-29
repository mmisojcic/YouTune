import { ArtistDTO } from 'src/app/DTOs/songless-artist.dto';
import { GenreDTO } from './genre.dto';
export interface SongDTO {
  songId?: number;
  title?: string;
  youtubeID?: string;
  genreId?: number;
  genre?: GenreDTO;
  artists?: ArtistDTO[];
  report?: null;
  playlistsSongs?: any[];
  artistsSongs?: ArtistDTO[];
}
