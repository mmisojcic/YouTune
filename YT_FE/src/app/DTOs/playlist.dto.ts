import { SongDTO } from './song.dto';

export interface PlaylistDTO {
  playlistId: number;
  title: string;
  userId: number;
  songs?: SongDTO[];
}
