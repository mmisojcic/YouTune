using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.DTOs
{
    public class UserReportDTO
    {
        public long UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
