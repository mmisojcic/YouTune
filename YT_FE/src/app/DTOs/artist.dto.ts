import { SongDTO } from './song.dto';

export interface ArtistDTO {
  artistId?: number;
  name?: string;
  song?: SongDTO;
}
