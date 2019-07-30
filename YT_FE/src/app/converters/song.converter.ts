import { Song } from './../models/song.model';
import { BaseConverter } from './base-converter.converter';
import { SongDTO } from '../DTOs/song.dto';
import { ArtistConverter } from './artist.converter';
import { GenreConverter } from './genre.converter';

export class SongConverter extends BaseConverter<Song, SongDTO> {
  artistConverter: ArtistConverter = new ArtistConverter();
  genreConverter: GenreConverter = new GenreConverter();

  public modelToDTO(model: Song): SongDTO {
    return {
      songId: model.songId,
      title: model.title,
      youtubeID: model.youtubeID,
      genreId: model.genreId,
      genre: null,
      artists: [],
      report: null,
      playlistsSongs: [],
      artistsSongs:
        model.artistsSongs === []
          ? []
          : this.artistConverter.modelToDTOList(model.artists)
    };
  }

  public DTOtoModel(dto: SongDTO): Song {
    let model: Song = new Song();

    (model.songId = dto.songId),
      (model.title = dto.title),
      (model.youtubeID = dto.youtubeID),
      (model.genre = this.genreConverter.DTOtoModel(dto.genre)),
      (model.artists = this.artistConverter.DTOtoModelList(dto.artists)),
      (model.report = dto.report),
      (model.artistsSongs = dto.artistsSongs);

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
