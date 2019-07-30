import { PlaylistDTO } from './playlist.dto';
import { GenreDTO } from './genre.dto';
import { ArtistDTO } from './artist.dto';
export interface SongDTO {
  songId?: number;
  title?: string;
  youtubeID?: string;
  genreId?: number;
  genre?: GenreDTO;
  artists?: ArtistDTO[];
  report?: null;
  playlistsSongs?: PlaylistDTO[];
  artistsSongs?: ArtistDTO[];
}
