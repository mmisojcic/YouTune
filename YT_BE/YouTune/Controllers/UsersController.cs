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
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserService _userService;
        private readonly LoginService _loginService;

        public UsersController(AppDbContext context, UserService userService, LoginService loginService)
        {
            _context = context;
            _userService = userService;
            _loginService = loginService;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<UserDTO> GetUsers()
        {
            return _userService.GetAll();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userService.GetOne(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] long id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           var userDTO = await _userService.Update(user, id);

           return Ok(userDTO);
        }

        // Register
        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<IActionResult> SaveUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDTO = await _loginService.Register(user);

            return Ok(userDTO);
        }

        // Login
        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginDTO loginInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDTO = await _loginService.Login(loginInfo);

            if (userDTO == null)
            {
                return NotFound("Error on login");
            }
            else
            {
                return Ok(userDTO);
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userService.Delete(id);
            
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }
            
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}