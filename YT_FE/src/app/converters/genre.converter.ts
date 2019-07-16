import { Genre } from 'src/app/models/genre.model';

import { BaseConverter } from './base-converter.converter';
import { GenreDTO } from '../DTOs/genre.dto';

export class GenreConverter extends BaseConverter<Genre, GenreDTO> {
  public modelToDTO(model: Genre): GenreDTO {
    let dto;
    model.genreId === null
      ? (dto = { name: model.name })
      : (dto = { genreId: model.genreId, name: model.name });
    return dto;
  }
  public DTOtoModel(dto: GenreDTO): Genre {
    return new Genre(dto.genreId, dto.name);
  }

  public DTOtoModelList(dto: GenreDTO[]): Genre[] {
    let modelList: Genre[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
