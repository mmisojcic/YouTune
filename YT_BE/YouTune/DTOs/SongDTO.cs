using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouTune.Models;

namespace YouTune.DTOs
{
    public class SongDTO
    {
        public long SongId { get; set; }
        public string Title { get; set; }
        public string YoutubeID { get; set; }

        //public long GenreId { get; set; }
        public SonglessGenreDTO Genre { get; set; }

        public ICollection<ArtistDTO> Artists { get; set; }

        public ReportInSongDTO Report { get; set; }

        //public ICollection<PlaylistSong> PlaylistSongs { get; set; }
        //public ICollection<ArtistSong> ArtistSongs { get; set; }
    }
}
