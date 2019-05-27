using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouTune.DTOs;
using YouTune.Models;
using YouTune.Services;

namespace YouTune.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PlaylistService _playlistService;

        public PlaylistsController(AppDbContext context, PlaylistService playlistService)
        {
            _context = context;
            _playlistService = playlistService;
        }

        // GET: api/Playlists
        [HttpGet]
        public IEnumerable<PlaylistDTO> GetPlaylist()
        {
            return _playlistService.GetAll();
        }

        // GET: api/Playlists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaylist([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var playlist = await _context.Playlists.FindAsync(id);

            if (playlist == null)
            {
                return NotFound();
            }

            return Ok(playlist);
        }

        // PUT: api/Playlists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaylist([FromRoute] long id, [FromBody] Playlist playlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var playlistDTO = await _playlistService.Update(playlist, id);

            return Ok(playlistDTO);

        }

        // POST: api/Playlists
        [HttpPost]
        public async Task<IActionResult> PostPlaylist([FromBody] Playlist playlist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var playlistDTO = await _playlistService.Save(playlist);

            return Ok(playlistDTO);
        }

        // DELETE: api/Playlists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaylist([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var playlist = await _playlistService.Delete(id);

            if (playlist == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(playlist);
            }
        }

        private bool PlaylistExists(long id)
        {
            return _context.Playlists.Any(e => e.PlaylistId == id);
        }
    }
}