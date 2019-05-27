using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.DTOs
{
    public class ReportInSongDTO
    {
        public long ReportId { get; set; }

        public long SongId { get; set; }

        public long UserId { get; set; }

        public DateTime Timestamp { get; set; }

        public long StatusId { get; set; }
        public StatusDTO Status { get; set; }
    }
}
