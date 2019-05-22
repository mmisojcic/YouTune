using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Role
    {
        public long RoleId { get; set; }
        public string Name { get; set; }

        public User user { get; set; }
    }
}
