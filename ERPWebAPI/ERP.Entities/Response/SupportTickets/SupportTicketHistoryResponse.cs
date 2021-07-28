using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.SupportTickets
{
    public class SupportTicketHistoryResponse
    {
        [JsonProperty(PropertyName = "ticketid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TicketID { get; set; }

        [JsonProperty(PropertyName = "username", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "createddate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime CreatedDate { get; set; }

        [JsonProperty(PropertyName = "AttachmentsList", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<TicketAttachmentResponse> AttachmentsList { get; set; }

        [JsonProperty(PropertyName = "ticketevent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TicketEvent { get; set; }

        [JsonProperty(PropertyName = "remarks", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Remarks { get; set; }
    }
}
