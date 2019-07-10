import { PlaylistDTO } from './../DTOs/playlist.dto';
import { Playlist } from './../models/playlists.model';
import { BaseConverter } from './base-converter.converter';

export class PlaylistConverter extends BaseConverter<Playlist, PlaylistDTO> {
  public modelToDTO(model: Playlist): PlaylistDTO {
    return {
      playlistId: model.playlistId,
      title: model.title,
      userId: model.userId
    };
  }

  public DTOtoModel(dto: PlaylistDTO): Playlist {
    return new Playlist(dto.playlistId, dto.title, dto.userId);
  }

  public DTOtoModelList(dto: PlaylistDTO[]): Playlist[] {
    let modelList: Playlist[] = [];

    dto.forEach(d => {
      modelList.push(this.DTOtoModel(d));
    });

    return modelList;
  }
}
