using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using YouTune.DTOs;
using YouTune.Models;

namespace YouTune.Services
{
    public class LoginService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserService _userService;

        public LoginService(AppDbContext context, IMapper mapper, UserService userService)
        {
            _context = context;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<UserDTO> Login(LoginDTO login)
        {
            var user =  _context.Users.Where(u => u.Username == login.Username && u.Password == login.Password).FirstOrDefault();

            if(user == null )
            {
                return null;
            }
            else
            {
                return await _userService.GetOne(user.UserId);
            }
            
        }

        public async Task<UserDTO> Register(User registerInfo)
        {
            return await _userService.SaveUser(registerInfo);
        }
    }
}
