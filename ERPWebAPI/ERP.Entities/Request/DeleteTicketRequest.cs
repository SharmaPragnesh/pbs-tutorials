using ERP.Entities.Response.SupportTickets;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class DeleteTicketRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "userid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UserId { get; set; }

        public List<TicketAttachmentResponse> AttachmentList { get; set; }
    }
}
