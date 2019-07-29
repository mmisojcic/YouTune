using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YouTune.DTOs;
using YouTune.Models;

namespace YouTune.Services
{
    public class PlaylistService : IYouTuneRepository<Playlist, PlaylistDTO>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PlaylistService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // DELETE
        public async Task<Playlist> Delete(long _id)
        {
            var playlistData = await _context.Playlists.FindAsync(_id);

            if (playlistData == null)
            {
                return null;
            }
            else
            {
                _context.Playlists.Remove(playlistData);
                await _context.SaveChangesAsync();

                return playlistData;
            }
        }

        public Task<IEnumerable<PlaylistDTO>> DeleteList(IEnumerable<Playlist> _object)
        {
            throw new NotImplementedException();
        }

        // GET ALL
        public IEnumerable<PlaylistDTO> GetAll()
        {
            var playlistData = _context.Playlists.ToList();
            var playlistsDTO = new List<PlaylistDTO>();

            foreach (Playlist p in playlistData)
            {
                var playlistDTO = _mapper.Map<Playlist, PlaylistDTO>(p);
                playlistsDTO.Add(playlistDTO);
            }

            return playlistsDTO;
        }

        // GET ONE
        public async Task<PlaylistDTO> GetOne(long _id)
        {
            var playlistData = await _context.Playlists.FindAsync(_id);

            if (playlistData == null)
            {
                return null;
            }
            else
            {
                var songsData = _context.PlaylistsSongs
                    .Where(pls => pls.PlaylistId == playlistData.PlaylistId)
                    .Select(pls => _mapper.Map<Song, SongForPlaylistDTO>(pls.Song))
                    .ToList();

                foreach (SongForPlaylistDTO s in songsData)
                {
                    var genreData = await _context.Genres.Where(g => g.GenreId == s.GenreId).FirstOrDefaultAsync();
                    var reportData = await _context.Reports.Where(r => r.SongId == s.SongId).FirstOrDefaultAsync();
                    var artistsData = _context.ArtistsSongs.Where(ars => ars.SongId == s.SongId).Select(ars => ars.Artist).ToList();

                    s.Genre = _mapper.Map<Genre, SonglessGenreDTO>(genreData);
                    s.Artists = artistsData;
                    s.Report = _mapper.Map<Report, ReportInSongDTO>(reportData);

                }

                var playlistDTO = _mapper.Map<Playlist, PlaylistDTO>(playlistData);

                playlistDTO.Songs = songsData;
                return playlistDTO;
            }
        }

        // SAVE
        public async Task<PlaylistDTO> Save(Playlist _object)
        {
            _context.Playlists.Add(_object);
            await _context.SaveChangesAsync();

            return await GetOne(_object.PlaylistId);
        }


        // UPDATE
        public async Task<PlaylistDTO> Update(Playlist _object, long _id)
        {
            if (_id != _object.PlaylistId)
            {
                return null;
            }

            _context.Playlists.Update(_object);

            try
            {
                await _context.SaveChangesAsync();
                return await GetOne(_id);
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }
        }

        Task<IEnumerable<PlaylistDTO>> IYouTuneRepository<Playlist, PlaylistDTO>.Delete(long _id)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<PlaylistDTO>> IYouTuneRepository<Playlist, PlaylistDTO>.Save(Playlist _object)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<PlaylistDTO>> IYouTuneRepository<Playlist, PlaylistDTO>.Update(Playlist _object, long _id)
        {
            throw new NotImplementedException();
        }
    }
}
