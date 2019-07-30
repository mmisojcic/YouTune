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
    let model: Artist = new Artist();

    (model.artistId = dto.artistId),
      (model.name = dto.name),
      (model.songs =
        dto.songs === []
          ? []
          : this.songsForArtistConverter.DTOtoModelList(dto.songs));

    return model;
  }

  public DTOtoModelList(dto: ArtistDTO[]): Artist[] {
    let modelList: Artist[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }

  public modelToDTOList(dto: Artist[]): ArtistDTO[] {
    let modelList: ArtistDTO[] = [];

    dto.forEach(d => {
      modelList.push({
        artistId: d.artistId,
        name: d.name,
        songs: d.songs
      });
    });

    return modelList;
  }
}
