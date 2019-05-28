using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.DTOs
{
    public class UserDTO
    {
        public long UserId { get; set; }
        public string Username { get; set; }
        //public string Password { get; set; }
        public string Email { get; set; }
        
        public RoleDTO Role { get; set; }

        public ICollection<PlaylistDTO> Playlists { get; set; }

        //public ICollection<Report> Reports { get; set; }
    }
}
