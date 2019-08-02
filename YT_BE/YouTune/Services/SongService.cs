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

            // create new  list where ArtistSong object for deletion will be stored
            List<ArtistSong> forDeletion = new List<ArtistSong>();

            // get all Artist for song sent by put request
            var currentArtists = _context.ArtistsSongs.Where(ars => ars.SongId == _object.SongId).Select(ars => _mapper.Map<Artist, SonglessArtistDTO>(ars.Artist)).ToList();


            // iterate through the list
            foreach (var currentArtist in currentArtists)
            {
                // obtain temporary Artist matching current artist id and artist id from update object
                var tmpArtist = _object.ArtistsSongs.FirstOrDefault(updateArtist => updateArtist.ArtistId == currentArtist.ArtistId);

                if (tmpArtist != null)
                    // if  there is such object, delete it from update object list of artists and leave only new ones
                    _object.ArtistsSongs.Remove(tmpArtist);
                else
                    // if there is no such object, add it to the list of entities for deletion and later remove it
                     forDeletion =  _context.ArtistsSongs.Where(ars => ars.SongId == _object.SongId && ars.ArtistId == currentArtist.ArtistId).ToList();
                    // remove it from joined table
                    _context.ArtistsSongs.RemoveRange(forDeletion);
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
