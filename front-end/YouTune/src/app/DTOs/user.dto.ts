import { PlaylistDTO } from './playlist.dto';
import { RoleDTO } from './role.dto';

export interface UserDTO {
  userId: number;
  username: string;
  email: string;
  role: RoleDTO;
  playlists: PlaylistDTO[];
}
