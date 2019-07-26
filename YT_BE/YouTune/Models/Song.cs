using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Song
    {
        
        public long SongId { get; set; }
        public string Title { get; set; }
        public string YoutubeID { get; set; }
        
        public long GenreId { get; set; }
        public Genre Genre { get; set; }
        
        public Report Report { get; set; }

        public ICollection<PlaylistSong> PlaylistsSongs { get; set; }
        public ICollection<ArtistSong> ArtistsSongs { get; set; }
    }
}
