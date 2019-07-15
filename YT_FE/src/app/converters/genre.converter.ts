import { Genre } from 'src/app/models/genre.model';

import { BaseConverter } from './base-converter.converter';
import { GenreDTO } from '../DTOs/genre.dto';

export class GenreConverter extends BaseConverter<Genre, GenreDTO> {
  public modelToDTO(model: Genre): GenreDTO {
    return {
      id: model.id,
      name: model.name
    };
  }
  public DTOtoModel(dto: GenreDTO): Genre {
    return new Genre(dto.id, dto.name);
  }

  public DTOtoModelList(dto: GenreDTO[]): Genre[] {
    let modelList: Genre[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
