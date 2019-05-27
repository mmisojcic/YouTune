using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouTune.Models;

namespace YouTune.DTOs
{
    public class GenrelessSongDTO
    {
        public long SongId { get; set; }
        public string Title { get; set; }
        public string YoutubeID { get; set; }
        

        //public Report Report { get; set; }

        //public ICollection<PlaylistSong> PlaylistSongs { get; set; }
        public ICollection<ArtistSong> ArtistSongs { get; set; }
    }
}
