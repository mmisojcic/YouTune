import { ArtistDTO } from './../DTOs/artist.dto';
import { BaseConverter } from './base-converter.converter';
import { Artist } from '../models/artist.model';

export class ArtistConverter extends BaseConverter<Artist, ArtistDTO> {
  modelToDTO(model: Artist): ArtistDTO {
    let dto;
    model.artistId === null
      ? (dto = { name: model.name })
      : (dto = { artistId: model.artistId, name: model.name });
    return dto;
  }
  DTOtoModel(dto: ArtistDTO): Artist {
    return new Artist(dto.artistId, dto.name);
  }

  public DTOtoModelList(dto: ArtistDTO[]): Artist[] {
    let modelList: Artist[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
