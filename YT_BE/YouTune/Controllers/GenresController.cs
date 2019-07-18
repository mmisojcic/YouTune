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
        public IEnumerable<GenreDTO> GetGenres()
        {
            return _genreService.GetAll();
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

            var genreDTO = await _genreService.Update(genre, id);

            return Ok(genreDTO);
        }

        // POST: api/Genres
        [HttpPost]
        public async Task<IActionResult> PostGenre([FromBody] Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var genreDTO = await _genreService.Save(genre);

            return Ok(genreDTO);
        }

        //// POST: api/Genres
        //[HttpPost("saveAll")]
        //public async Task<IActionResult> PostGenres([FromBody] ICollection<Genre> genres)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    //var genreDTO = await _genreService.Save(genre);

        //    this._context.UpdateRange(genres);
        //    this._context.SaveChanges();

        //    return Ok("Radi");
        //}

        // DELETE: api/Genres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var genre = await _genreService.Delete(id);

            if (genre == null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }
        }

        // DELETE: api/Genres/bulk
        [HttpDelete("bulk")]
        public async Task<IActionResult> DeleteGenres([FromBody] ICollection<Genre> genres)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RemoveRange(genres);
            _context.SaveChanges();

            return Ok(_genreService.GetAll());
        }

        private bool GenreExists(long id)
        {
            return _context.Genres.Any(e => e.GenreId == id);
        }
    }
}