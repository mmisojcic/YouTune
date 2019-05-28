using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouTune.Models;

namespace YouTune.DTOs
{
    public class PlaylistDTO
    {
        public long PlaylistId { get; set; }
        public string Title { get; set; }

        public long UserId { get; set; }

        public ICollection<SongForPlaylistDTO> Songs { get; set; }
    }
}
