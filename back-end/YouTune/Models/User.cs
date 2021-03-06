﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class User
    {
        public long UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public long RoleId { get; set; }
        public Role Role { get; set; }

        public ICollection<Playlist> Playlists { get; set; }

        public ICollection<Report> Reports { get; set; }
    }
}
