using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Playlist
    {
        public long PlaylistId { get; set; }
        public string Title { get; set; }

        public ICollection<PlaylistSong> PlaylistSongs { get; set; }
    }
}
