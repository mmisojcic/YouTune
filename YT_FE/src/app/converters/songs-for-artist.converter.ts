import { Song } from './../models/song.model';
import { BaseConverter } from './base-converter.converter';
import { SongDTO } from '../DTOs/song.dto';

export class SongsForArtistConverter extends BaseConverter<Song, SongDTO> {
  public modelToDTO(model: Song): SongDTO {
    throw new Error('Method not implemented.');
  }

  public DTOtoModel(dto: SongDTO): Song {
    const model: Song = new Song();

    model.songId = dto.songId;
    model.title = dto.title;
    model.youtubeID = dto.youtubeID;

    return model;
  }

  modelToDTOList(model: Song[]): SongDTO[] {
    const dtoList: SongDTO[] = [];

    model.forEach(m => {
      dtoList.push({
        songId: m.songId,
        title: m.title
      });
    });

    // ????
    return dtoList;
  }

  DTOtoModelList(dto: SongDTO[]): Song[] {
    const modelList: Song[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
