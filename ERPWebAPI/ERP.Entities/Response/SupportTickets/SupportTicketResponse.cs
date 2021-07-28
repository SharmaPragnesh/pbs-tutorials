using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.SupportTickets
{
    public class SupportTicketResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "ticketno", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TicketNo { get; set; }

        [JsonProperty(PropertyName = "ticketdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime TicketDate { get; set; }

        [JsonProperty(PropertyName = "typeid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TypeID { get; set; }

        [JsonProperty(PropertyName = "categoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CategoryID { get; set; }

        [JsonProperty(PropertyName = "severityid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long SeverityID { get; set; }

        [JsonProperty(PropertyName = "priorityid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long PriorityID { get; set; }

        [JsonProperty(PropertyName = "statusid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long StatusID { get; set; }

        [JsonProperty(PropertyName = "statusname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string StatusName { get; set; }

        [JsonProperty(PropertyName = "assignedtoid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? AssignedToID { get; set; }

        [JsonProperty(PropertyName = "assignedtoname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AssignedToName { get; set; }

        [JsonProperty(PropertyName = "assignedtogroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long AssignedToGroupID { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "l1ticketsupportgroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long L1TicketSupportGroupID { get; set; }

        [JsonProperty(PropertyName = "l1resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? L1ResourceID { get; set; }

        [JsonProperty(PropertyName = "l1resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string L1ResourceName { get; set; }
    }
}
