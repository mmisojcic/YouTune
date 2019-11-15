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
    public class ArtistsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ArtistService _artistService;

        public ArtistsController(AppDbContext context, ArtistService artistService)
        {
            _context = context;
            _artistService = artistService;
        }

        // SEARCH: api/Artists/searchByName
        [HttpGet("searchByName")]
        public  IActionResult GetArtistsByName([FromQuery(Name = "name")] string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artistSearchResult =  _artistService.SearchByName(name);

            if (artistSearchResult == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(artistSearchResult.ToList());
            }
        }


        // GET: api/Artists
        [HttpGet]
        public IEnumerable<ArtistDTO> GetArtists()
        {
            return _artistService.GetAll();
        }

        // GET: api/Artists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtist([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artist = await _artistService.GetOne(id);

            if (artist == null)
            {
                return NotFound();
            }

            return Ok(artist);
        }

        // PUT: api/Artists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtist([FromRoute] long id, [FromBody] Artist artist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artistDTO = await _artistService.Update(artist, id);

            return Ok(artistDTO);
        }

        // POST: api/Artists
        [HttpPost]
        public async Task<IActionResult> PostArtist([FromBody] Artist artist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artistDTO = await _artistService.Save(artist);

            return Ok(artistDTO);
        }

        // DELETE: api/Artists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artist = await _artistService.Delete(id);

            if (artist == null)
            {
                return NotFound();
            }
            else {
                return Ok(artist);
            }
            
        }


        // DELETE: api/Artists/deleteList
        [HttpPost("deleteList")]
        public async Task<IActionResult> DeleteGenres([FromBody] IEnumerable<Artist> artists)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var remainingArtist = await _artistService.DeleteList(artists);

            if (remainingArtist == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(remainingArtist.ToList());
            }
        }

        private bool ArtistExists(long id)
        {
            return _context.Artists.Any(e => e.ArtistId == id);
        }
    }
}