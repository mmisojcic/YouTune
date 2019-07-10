using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouTune.Models;

namespace YouTune.DTOs
{
    public class GenreDTO
    {
        public long GenreId { get; set; }
        public string Name { get; set; }

        public ICollection<GenrelessSongDTO> Songs { get; set; }
    }
}
