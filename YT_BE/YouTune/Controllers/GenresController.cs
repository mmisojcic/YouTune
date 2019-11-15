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
    public class GenresController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly GenreService _genreService;

        public GenresController(AppDbContext context, GenreService genreService)
        {
            _context = context;
            _genreService = genreService;
        }

        // GET: api/Genres
        [HttpGet]
        public IActionResult GetGenres()
        {
            return Ok(new Response(0, _genreService.GetAll(), ""));
        }

        // GET: api/Genres/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenre([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var genreDTO = await _genreService.GetOne(id);

            if (genreDTO == null)
            {
                return NotFound();
            }

            return Ok(genreDTO);
        }

        // PUT: api/Genres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGenre([FromRoute] long id, [FromBody] Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var genresDTO = await  _genreService.Update(genre, id);

            return Ok(new Response(0, genresDTO, ""));
        }

        // POST: api/Genres
        [HttpPost]
        public async Task<IActionResult> PostGenre([FromBody] Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var genresDTO = await _genreService.Save(genre);

            return Ok(new Response(0, genresDTO, ""));
        }

        // DELETE: api/Genres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre([FromRoute] long id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var genreData = await _context.Genres.FindAsync(id);

            if (genreData == null)
            {
                return NotFound(new Response(0, null, "Id not found!"));
            }
          
            try
             {
                _context.Genres.Remove(genreData);
                await _context.SaveChangesAsync();
                return Ok(new Response(0, _genreService.GetAll(), ""));
             }
             catch(DbUpdateException)
             {
                return Ok(new Response(0,null,"Can't delete! Some songs are related to this genre!"));
             }
            
        }

        // DELETE: api/Genres/deleteList
        [HttpPost("deleteList")]
        public async Task<IActionResult> DeleteGenres([FromBody] IEnumerable<Genre> genres)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var remainingGenres = await _genreService.DeleteList(genres);

            if (remainingGenres == null)
            {
                return BadRequest((new Response(0, null, "")));
            }
            else
            {
                return Ok((new Response(0, remainingGenres.ToList(), "")));
            }
        }

        private bool GenreExists(long id)
        {
            return _context.Genres.Any(e => e.GenreId == id);
        }
    }
}