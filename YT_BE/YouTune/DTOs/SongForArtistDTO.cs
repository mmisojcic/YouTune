using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.DTOs
{
    public class SongForArtistDTO
    {
        public long SongId { get; set; }
        public string Title { get; set; }
        public string YoutubeID { get; set; }
        
        public long GenreID { get; set; }
        //public SonglessGenreDTO Genre { get; set; }
        
    }
}
