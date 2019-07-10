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
    return new Role(dto.roleId, dto.name);
  }
}
