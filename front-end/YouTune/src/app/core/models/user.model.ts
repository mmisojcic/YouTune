import { Role } from './role.model';

export class User {
  constructor(
    public userId?: number,
    public username?: string,
    public email?: string,
    public role?: Role,
    public playlists?: any[]
  ) {}
}
