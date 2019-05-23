using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Report
    {
        public long ReportId { get; set; }

        public long SongId { get; set; }
        public Song Song { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }

        public DateTime Timestamp { get; set; }

        public long StatusId { get; set; }
        public Status Status { get; set; }
    }
}
