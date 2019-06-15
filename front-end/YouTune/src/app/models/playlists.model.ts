import { Song } from './song.model';

export class Playlist {
  constructor(
    public playlistId?: number,
    public title?: string,
    public userId?: number,
    public songs?: Song[]
  ) {}
}
