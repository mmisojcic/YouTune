import { Song } from './../models/song.model';
import { BaseConverter } from './base-converter.converter';
import { SongDTO } from '../DTOs/song.dto';
import { GenreConverter } from './genre.converter';
import { ArtistForSongConverter } from './artist-for-song.converter';

export class SongConverter extends BaseConverter<Song, SongDTO> {
  artistForSongConverter: ArtistForSongConverter = new ArtistForSongConverter();
  genreConverter: GenreConverter = new GenreConverter();

  public modelToDTO(model: Song): SongDTO {
    let dto: SongDTO;

    model.songId === null
      ? (dto = {
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
              : this.artistForSongConverter.modelToDTOList(model.artistsSongs)
        })
      : (dto = {
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
              : this.artistForSongConverter.modelToDTOList(model.artistsSongs)
        });

    return dto;
  }

  public DTOtoModel(dto: SongDTO): Song {
    const model: Song = new Song();

    model.songId = dto.songId;
    model.title = dto.title;
    model.youtubeID = dto.youtubeID;
    model.genre = this.genreConverter.DTOtoModel(dto.genre);
    model.artists = this.artistForSongConverter.DTOtoModelList(dto.artists);
    model.report = dto.report;
    model.artistsSongs = [];

    return model;
  }

  DTOtoModelList(dto: SongDTO[]): Song[] {
    const modelList: Song[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
