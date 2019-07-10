using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class PlaylistSong
    {
        public long SongId { get; set; }
        public Song Song { get; set; }

        public long PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
    }
}
