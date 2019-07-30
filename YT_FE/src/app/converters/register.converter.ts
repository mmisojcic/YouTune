import { Register } from '../models/register.model';
import { RegisterDTO } from '../DTOs/register.dto';
import { BaseConverter } from './base-converter.converter';

export class RegisterConverter extends BaseConverter<Register, RegisterDTO> {
  public modelToDTO(model: Register): RegisterDTO {
    return {
      username: model.username,
      password: model.password,
      email: model.email
    };
  }

  DTOtoModel(dto: RegisterDTO): Register {
    return new Register(dto.username, dto.password, dto.email);
  }
}
