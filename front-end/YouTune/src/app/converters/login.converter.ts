import { LoginDTO } from './../DTOs/login.dto';
import { BaseConverter } from './base-converter.converter';
import { Login } from '../models/login.model';

export class LoginConverter extends BaseConverter<Login, LoginDTO> {
  public modelToDTO(model: Login): LoginDTO {
    return {
      username: model.username,
      password: model.password
    };
  }
  public DTOtoModel(dto: LoginDTO): Login {
    return new Login(dto.username, dto.password);
  }
}
