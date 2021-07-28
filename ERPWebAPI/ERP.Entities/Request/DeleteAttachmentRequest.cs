using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class DeleteAttachmentRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "ticketid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TicketID { get; set; }

        [JsonProperty(PropertyName = "filename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FileName { get; set; }
    }
}
