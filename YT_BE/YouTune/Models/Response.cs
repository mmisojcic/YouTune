using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouTune.Models
{
    public class Response
    {
        public int Code { get; set; }
        public Object Payload { get; set; }
        public string Description { get; set; } 

        public Response(int code, Object payload, string description)
        {
            Code = code;
            Payload = payload;
            Description = description;
        }

        
    }
}
