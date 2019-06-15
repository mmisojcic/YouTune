import { PlaylistConverter } from './playlist.converter';
import { BaseConverter } from './base-converter.converter';
import { User } from '../models/user.model';
import { UserDTO } from '../DTOs/user.dto';
import { RoleConverter } from './role.converter';

export class UserConverter extends BaseConverter<User, UserDTO> {
  roleConverter = new RoleConverter();
  playlistConverter = new PlaylistConverter();

  public modelToDTO(model: User): UserDTO {
    throw new Error('Method not implemented.');
  }
  public DTOtoModel(dto: UserDTO): User {
    return new User(
      dto.userId,
      dto.username,
      dto.email,
      this.roleConverter.DTOtoModel(dto.role),
      this.playlistConverter.DTOtoModelList(dto.playlists)
    );
  }
}
