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
    public class SongService : IYouTuneRepository<Song, SongDTO>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ArtistService _artistService;

        public SongService(AppDbContext context, IMapper mapper, ArtistService artistService)
        {
            _context = context;
            _mapper = mapper;
            _artistService = artistService;
        }

        // DELETE
        public async Task<IEnumerable<SongDTO>> Delete(long _id)
        {
            var songData = await _context.Songs.FindAsync(_id);

            if (songData == null)
            {
                return null;
            }
            else
            {
                _context.Songs.Remove(songData);
                await _context.SaveChangesAsync();

                return GetAll();
            }
        }

        // DELETE LIST
        public async Task<IEnumerable<SongDTO>> DeleteList(IEnumerable<Song> _object)
        {
            _context.Songs.RemoveRange(_object);
            await _context.SaveChangesAsync();

            var songsDTO = GetAll();

            return songsDTO;
        }

        //GET ALL
        public IEnumerable<SongDTO> GetAll()
        {
            var songsData = _context.Songs
                .Include(s => s.Genre)
                .Include(s => s.Report)
                .AsNoTracking();
            var songsDTO = new List<SongDTO>();

            foreach (Song s in songsData)
            {
                var artistsSong = _context.ArtistsSongs.Where(ars => ars.SongId == s.SongId).Select(ars => _mapper.Map<Artist, SonglessArtistDTO>(ars.Artist)).ToList();
                var songDTO = _mapper.Map<Song, SongDTO>(s);
                songDTO.Artists = artistsSong;
                songsDTO.Add(songDTO);
            }

            return songsDTO;
        }

        // GET ONE
        public async Task<SongDTO> GetOne(long _id)
        {
            var songData = await _context.Songs.FindAsync(_id);

            if (songData == null)
            {
                return null;
            }
            else
            {
                var genreData = await _context.Genres.FindAsync(songData.GenreId);
                var reportData = await _context.Reports.Where(r => r.SongId == songData.SongId).FirstOrDefaultAsync();

                var artistsData = _context.ArtistsSongs.Where(ars => ars.SongId == songData.SongId).Select(ars => _mapper.Map<Artist, SonglessArtistDTO>(ars.Artist)).ToList();

                songData.Genre = genreData;

                var songDTO = _mapper.Map<Song, SongDTO>(songData);
                songDTO.Artists = artistsData;
                songDTO.Report = _mapper.Map<Report, ReportInSongDTO>(reportData);

                return songDTO;
            }
        }

        // SAVE
        public async Task<IEnumerable<SongDTO>> Save(Song _object)
        {
            _context.Songs.Add(_object);
            await _context.SaveChangesAsync();

            return GetAll();
        }


        // UPDATE
        public async Task<IEnumerable<SongDTO>> Update(Song _object, long _id)
        {
            if (_id != _object.SongId)
            {
                return null;
            }



            _context.Songs.Update(_object);

            try
            {
                await _context.SaveChangesAsync();
                return GetAll();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }
        }

    }
}
