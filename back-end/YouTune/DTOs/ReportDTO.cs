using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouTune.Models;

namespace YouTune.DTOs
{
    public class ReportDTO
    {
        public long ReportId { get; set; }

        public long SongId { get; set; }
        public GenrelessSongDTO Song { get; set; }

        public long UserId { get; set; }
        public UserReportDTO User { get; set; }

        public DateTime Timestamp { get; set; }

        public long StatusId { get; set; }
        public StatusDTO Status { get; set; }
    }
}
