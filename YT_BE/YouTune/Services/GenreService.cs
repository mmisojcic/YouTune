﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YouTune.DTOs;
using YouTune.Models;

namespace YouTune.Services
{
    public class GenreService : IYouTuneRepository<Genre, GenreDTO>
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GenreService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // DELETE
        public async Task<IEnumerable<GenreDTO>> Delete(long _id)
        {
            var genreData = await _context.Genres.FindAsync(_id);

            if (genreData == null)
            {
                return null;
            }
            else
            {
                _context.Genres.Remove(genreData);
                await _context.SaveChangesAsync();

                return GetAll();
            }
        }

        // DELETE LIST
        public async Task<IEnumerable<GenreDTO>> DeleteList(IEnumerable<Genre> _object)
        {

            _context.Genres.RemoveRange(_object);
            await _context.SaveChangesAsync();

            var genresDTO = this.GetAll();

            return genresDTO;

        }

        // GET ALL
        public IEnumerable<GenreDTO> GetAll()
        {
            var genresData = _context.Genres.AsNoTracking();
            var genresDTO = new List<GenreDTO>();

            foreach (Genre g in genresData)
            {

                var genreDTO = _mapper.Map<Genre, GenreDTO>(g);

                genresDTO.Add(genreDTO);
            }

            return genresDTO;
        }

        // GET ONE
        public async Task<GenreDTO> GetOne(long _id)
        {
            var genreData = await _context.Genres.FindAsync(_id);

            if (genreData == null)
            {
                return null;
            }
            else
            {
                var songsData = _context.Songs.Where(s => s.GenreId == genreData.GenreId).ToList();

                genreData.Songs = songsData;

                return _mapper.Map<Genre, GenreDTO>(genreData);
            }
        }

        // SAVE
        public async Task<IEnumerable<GenreDTO>> Save(Genre _object)
        {
            _context.Genres.Add(_object);
            await _context.SaveChangesAsync();

            return GetAll();
        }


        // UPDATE
        public async Task<IEnumerable<GenreDTO>> Update(Genre _object, long _id)
        {
            if (_id != _object.GenreId)
            {
                return null;
            }

            _context.Entry(_object).State = EntityState.Modified;

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
