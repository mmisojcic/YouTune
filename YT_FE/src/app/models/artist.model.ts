import { Song } from './song.model';

export class Artist {
  constructor(
    public artistId?: number,
    public name?: string,
    public song?: Song[]
  ) {}
}
