using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouTune.Models;

namespace YouTune.DTOs
{
    public class ArtistDTO
    {
        public long ArtistId { get; set; }
        public string Name { get; set; }

        public ICollection<SongForArtistDTO> Songs { get; set; }
    }
}
