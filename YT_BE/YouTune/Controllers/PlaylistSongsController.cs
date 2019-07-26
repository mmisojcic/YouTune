using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouTune.Models;

namespace YouTune.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistSongsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlaylistSongsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/PlaylistSongs
        [HttpGet]
        public IEnumerable<PlaylistSong> GetPlaylistSong()
        {
            return _context.PlaylistsSongs;
        }

        // GET: api/PlaylistSongs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaylistSong([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var playlistSong = await _context.PlaylistsSongs.FindAsync(id);

            if (playlistSong == null)
            {
                return NotFound();
            }

            return Ok(playlistSong);
        }

        // PUT: api/PlaylistSongs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaylistSong([FromRoute] long id, [FromBody] PlaylistSong playlistSong)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != playlistSong.SongId)
            {
                return BadRequest();
            }

            _context.Entry(playlistSong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaylistSongExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PlaylistSongs
        [HttpPost]
        public async Task<IActionResult> PostPlaylistSong([FromBody] PlaylistSong playlistSong)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PlaylistsSongs.Add(playlistSong);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PlaylistSongExists(playlistSong.SongId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPlaylistSong", new { id = playlistSong.SongId }, playlistSong);
        }

        // DELETE: api/PlaylistSongs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaylistSong([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var playlistSong = await _context.PlaylistsSongs.FindAsync(id);
            if (playlistSong == null)
            {
                return NotFound();
            }

            _context.PlaylistsSongs.Remove(playlistSong);
            await _context.SaveChangesAsync();

            return Ok(playlistSong);
        }

        private bool PlaylistSongExists(long id)
        {
            return _context.PlaylistsSongs.Any(e => e.SongId == id);
        }
    }
}