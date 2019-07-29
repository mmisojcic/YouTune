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
    public class SongsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly SongService _songService;

        public SongsController(AppDbContext context, SongService songService)
        {
            _context = context;
            _songService = songService;
        }

        // GET: api/Songs
        [HttpGet]
        public IEnumerable<SongDTO> GetSongs()
        {
            return _songService.GetAll();
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSong([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var songDTO = await _songService.GetOne(id);

            if (songDTO == null)
            {
                return NotFound();
            }

            return Ok(songDTO);
        }

        // PUT: api/Songs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSong([FromRoute] long id, [FromBody] Song song)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var songsDTO = await _songService.Update(song, id);

            return Ok(songsDTO);
        }

        // POST: api/Songs
        [HttpPost]
        public async Task<IActionResult> PostSong([FromBody] Song song)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var songsDTO = await _songService.Save(song);

            return Ok(songsDTO);
        }

       

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var songsDTO = await _songService.Delete(id);

            if (songsDTO == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(songsDTO);
            }
        }

        private bool SongExists(long id)
        {
            return _context.Songs.Any(e => e.SongId == id);
        }
    }
}