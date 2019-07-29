﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouTune.DTOs;
using YouTune.Models;

namespace YouTune.Services
{
    public class UserService : IYouTuneRepository<User, UserDTO>
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // DELETE
        public async Task<User> DeleteUser(long _id)
        {
            var userData = await _context.Users.FindAsync(_id);

            if (userData == null)
            {
                return null;
            }
            else
            {
                _context.Users.Remove(userData);
                await _context.SaveChangesAsync();

                return userData;
            }

        }

        // DELETE LIST
        public Task<IEnumerable<UserDTO>> DeleteList(IEnumerable<User> _object)
        {
            throw new NotImplementedException();
        }

        //GET ALL
        public IEnumerable<UserDTO> GetAll()
        {
            var usersData = _context.Users.ToList();
            var usersDTO = new List<UserDTO>();

            foreach (User u in usersData)
            {
                var roleData = _context.Roles.Find(u.RoleId);
                var playlistData = _context.Playlists.Where(p => p.UserId == u.UserId).ToList();
                u.Role = roleData;
                u.Playlists = playlistData;

                var userDTO = _mapper.Map<User, UserDTO>(u);

                usersDTO.Add(userDTO);
            }

            return usersDTO;
        }

        // GET ONE
        public async Task<UserDTO> GetOne(long _id)
        {
            var userData = await _context.Users.FindAsync(_id);

            if (userData == null)
            {
                return null;
            }
            else
            {
                var roleData = await _context.Roles.FindAsync(userData.RoleId);
                var playlistData = _context.Playlists.Where(p => p.UserId == _id).ToList();

                userData.Role = roleData;
                userData.Playlists = playlistData;

                return _mapper.Map<User, UserDTO>(userData);
            }

        }

        // SAVE
        public async Task<UserDTO> SaveUser(User _object)
        {
            _object.RoleId = 2;
            _context.Users.Add(_object);
            await _context.SaveChangesAsync();

            return await GetOne(_object.UserId);
        }


        // UPDATE
        public async Task<UserDTO> UpdateUser(User _object, long _id)
        {
            if (_id != _object.UserId)
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

        Task<IEnumerable<UserDTO>> IYouTuneRepository<User, UserDTO>.Delete(long _id)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<UserDTO>> IYouTuneRepository<User, UserDTO>.Save(User _object)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<UserDTO>> IYouTuneRepository<User, UserDTO>.Update(User _object, long _id)
        {
            throw new NotImplementedException();
        }
    }
}
