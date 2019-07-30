import { Song } from './../models/song.model';
import { BaseConverter } from './base-converter.converter';
import { SongDTO } from '../DTOs/song.dto';

export class SongsForArtistConverter extends BaseConverter<Song, SongDTO> {
  public modelToDTO(model: Song): SongDTO {
    throw new Error('Method not implemented.');
  }

  public DTOtoModel(dto: SongDTO): Song {
    let model: Song = new Song();

    model.songId = dto.songId;
    (model.title = dto.title), (model.youtubeID = dto.youtubeID);

    return model;
  }

  DTOtoModelList(dto: SongDTO[]): Song[] {
    let modelList: Song[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
