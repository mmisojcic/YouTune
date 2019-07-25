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
    public class ArtistService : IYouTuneRepository<Artist, ArtistDTO>
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ArtistService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // DELETE
        public async Task<Artist> Delete(long _id)
        {
            var artistData = await _context.Artists.FindAsync(_id);

            if (artistData == null)
            {
                return null;
            }
            else
            {
                _context.Artists.Remove(artistData);
                await _context.SaveChangesAsync();

                return artistData;
            }
        }

        // DELETE LIST
        public async Task<IEnumerable<ArtistDTO>> DeleteList(IEnumerable<Artist> _object)
        {

            _context.Artists.RemoveRange(_object);
            await _context.SaveChangesAsync();

            var artistsDTO = this.GetAll();

            return artistsDTO;
        }


        // GET ALL
        public IEnumerable<ArtistDTO> GetAll()
        {
            var artistsData = _context.Artists.ToList();
            var artistsDTO = new List<ArtistDTO>();

            foreach (Artist a in artistsData)
            {

                var songsDTO = _context.ArtistSong.Where(ars => ars.ArtistId == a.ArtistId).Select(ars => _mapper.Map<Song, SongForArtistDTO>(ars.Song)).ToList();
                var artistDTO = _mapper.Map<Artist, ArtistDTO>(a);

                artistDTO.Songs = songsDTO;

                artistsDTO.Add(artistDTO);
            }

            return artistsDTO;
        }

        // GET ONE
        public async Task<ArtistDTO> GetOne(long _id)
        {
            var artistData = await _context.Artists.FindAsync(_id);

            if (artistData == null)
            {
                return null;
            }
            else
            {

                var songsDTO = _context.ArtistSong
                    .Where(ars => ars.ArtistId == artistData.ArtistId)
                    .Select(ars => _mapper.Map<Song, SongForArtistDTO>(ars.Song)
                        ).ToList();

                var artistDTO = _mapper.Map<Artist, ArtistDTO>(artistData);

                artistDTO.Songs = songsDTO;

                return artistDTO;
            }
        }

        // SAVE
        public async Task<ArtistDTO> Save(Artist _object)
        {
            _context.Artists.Add(_object);
            await _context.SaveChangesAsync();

            return await GetOne(_object.ArtistId);
        }


        // UPDATE
        public async Task<ArtistDTO> Update(Artist _object, long _id)
        {
            if (_id != _object.ArtistId)
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
