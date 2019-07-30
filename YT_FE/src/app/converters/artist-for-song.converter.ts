import { ArtistDTO } from '../DTOs/artist.dto';
import { BaseConverter } from './base-converter.converter';
import { Artist } from '../models/artist.model';
import { SongsForArtistConverter } from './songs-for-artist.converter';

export class ArtistForSongConverter extends BaseConverter<Artist, ArtistDTO> {
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
    const dtoList: ArtistDTO[] = [];

    model.forEach(m => {
      dtoList.push({
        artistId: m.artistId,
        name: m.name
      });
    });

    return dtoList;
  }
}
