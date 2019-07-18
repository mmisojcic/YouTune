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
        public async Task<Song> Delete(long _id)
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

                return songData;
            }
        }

        // DELETE LIST
        public Task<IEnumerable<SongDTO>> DeleteList(IEnumerable<Song> _object)
        {
            throw new NotImplementedException();
        }

        //GET ALL
        public IEnumerable<SongDTO> GetAll()
        {
            var songsData = _context.Songs
                .Include(s => s.Genre)
                .Include(s => s.Report)
                .ToList();
            var songsDTO = new List<SongDTO>();

            foreach (Song s in songsData)
            {
                var artistsSong = _context.ArtistSong.Where(ars => ars.SongId == s.SongId).Select(ars => _mapper.Map<Artist, ArtistDTO>(ars.Artist)).ToList();
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

                var artistsData = _context.ArtistSong.Where(ars => ars.SongId == songData.SongId).Select(ars => _mapper.Map<Artist, ArtistDTO>(ars.Artist)).ToList();

                songData.Genre = genreData;

                var songDTO = _mapper.Map<Song, SongDTO>(songData);
                songDTO.Artists = artistsData;
                songDTO.Report = _mapper.Map<Report, ReportInSongDTO>(reportData);

                return songDTO;
            }
        }

        // SAVE
        public async Task<SongDTO> Save(Song _object)
        {
            _context.Songs.Add(_object);
            await _context.SaveChangesAsync();

            return await GetOne(_object.SongId);
        }

        // UPDATE
        public async Task<SongDTO> Update(Song _object, long _id)
        {
            if (_id != _object.SongId)
            {
                return null;
            }

            _context.Entry(_object).State = EntityState.Modified;

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
    }
}
