using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Status
    {
        public long StatusId { get; set; }
        public string Name { get; set; }

        public ICollection<Report> Reports { get; set; }
    }
}
