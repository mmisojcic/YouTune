import { Role } from '../models/role.model';
import { RoleDTO } from '../DTOs/role.dto';

import { BaseConverter } from './base-converter.converter';

export class RoleConverter extends BaseConverter<Role, RoleDTO> {
  public modelToDTO(model: Role): RoleDTO {
    return {
      roleId: model.roleId,
      name: model.name
    };
  }
  public DTOtoModel(dto: RoleDTO): Role {
    let model: Role = new Role();

    model.roleId = dto.roleId;
    model.name = dto.name;

    return model;
  }
}
