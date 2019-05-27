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
                return _mapper.Map<Playlist, PlaylistDTO>(playlistData);
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
