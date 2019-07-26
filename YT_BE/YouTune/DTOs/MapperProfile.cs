using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using YouTune.Models;

namespace YouTune.DTOs
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<User, UserDTO>();
            CreateMap<Role, RoleDTO>();
            CreateMap<Playlist, PlaylistDTO>();
            CreateMap<Artist, ArtistDTO>();
            CreateMap<Genre, GenreDTO>();
            CreateMap<Song, SongDTO>();
            CreateMap<SongDTO, Song>();
            CreateMap<Song, SongForPlaylistDTO>();
            CreateMap<Report, ReportDTO>();
            CreateMap<Status, StatusDTO>();
            CreateMap<Report, ReportInSongDTO>();
            CreateMap<Song, ArtistSong>();
            CreateMap<Artist, SonglessArtistDTO>();
        }
    }
}
