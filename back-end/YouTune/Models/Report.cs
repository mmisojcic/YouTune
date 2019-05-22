using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Report
    {
        public long ReportId { get; set; }
        public byte Status { get; set; }

        public long SongId { get; set; }
        public Song Song { get; set; }
    }
}
