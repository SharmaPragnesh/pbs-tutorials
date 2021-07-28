using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.SupportTickets
{
    public class EmailDetailsResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "ticketno", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TicketNo { get; set; }

        [JsonProperty(PropertyName = "statusname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string StatusName { get; set; }

        [JsonProperty(PropertyName = "eventname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string EventName { get; set; }

        [JsonProperty(PropertyName = "assignedtoname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AssignedToName { get; set; }

        [JsonProperty(PropertyName = "requestor", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Requestor { get; set; }

        [JsonProperty(PropertyName = "requestoremail", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string RequestorEmail { get; set; }

        [JsonProperty(PropertyName = "subject", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Subject { get; set; }

        [JsonProperty(PropertyName = "assignedtopersonemail", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AssignedToPersonEmail { get; set; }

        [JsonProperty(PropertyName = "supportgroupmembersemail", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> SupportGroupMembersEmail { get; set; }

        [JsonProperty(PropertyName = "loggedon", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime LoggedOn { get; set; }

        [JsonProperty(PropertyName = "fileurl", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FileUrl { get; set; }
    }
}
