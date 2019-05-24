using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class ArtistSong
    {
        public long SongId { get; set; }
        public Song Song { get; set; }

        public long ArtistId { get; set; }
        public Artist Artist { get; set; }
    }
}
