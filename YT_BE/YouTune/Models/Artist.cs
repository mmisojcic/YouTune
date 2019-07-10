using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Artist
    {
        public long ArtistId { get; set; }
        public string Name { get; set; }
        
        public ICollection<ArtistSong> ArtistSongs { get; set; }
    }
}
