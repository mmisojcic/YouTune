import { ArtistDTO } from '../DTOs/artist.dto';
import { BaseConverter } from './base-converter.converter';
import { Artist } from '../models/artist.model';
import { SongConverter } from './song.converter';
import { SongsForArtistConverter } from './songs-for-artist.converter';

export class ArtistConverter extends BaseConverter<Artist, ArtistDTO> {
  songsForArtistConverter: SongsForArtistConverter = new SongsForArtistConverter();

  modelToDTO(model: Artist): ArtistDTO {
    let dto;

    model.artistId === null
      ? (dto = { name: model.name })
      : (dto = { artistId: model.artistId, name: model.name });

    return dto;
  }

  DTOtoModel(dto: ArtistDTO): Artist {
    const model: Artist = new Artist();

    model.artistId = dto.artistId;
    model.name = dto.name;
    model.songs =
      dto.songs === []
        ? []
        : this.songsForArtistConverter.DTOtoModelList(dto.songs);

    return model;
  }

  public DTOtoModelList(dto: ArtistDTO[]): Artist[] {
    const modelList: Artist[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }

  public modelToDTOList(model: Artist[]): ArtistDTO[] {
    const modelList: ArtistDTO[] = [];

    model.forEach(m => {
      modelList.push({
        artistId: m.artistId,
        name: m.name,
        songs: m.songs.length > 0 ? [] : []
      });
    });

    return modelList;
  }
}
