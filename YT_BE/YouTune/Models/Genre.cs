using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Genre
    {
        public long GenreId { get; set; }
        public string Name { get; set; }

        public ICollection<Song> Songs{ get; set; }
    }
}
