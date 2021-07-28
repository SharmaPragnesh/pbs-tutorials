using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.SupportTickets
{
    public class SupportTicketListResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "ticketno", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TicketNo { get; set; }

        [JsonProperty(PropertyName = "ticketdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime TicketDate { get; set; }

        [JsonProperty(PropertyName = "typename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TypeName { get; set; }

        [JsonProperty(PropertyName = "categoryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CategoryName { get; set; }

        [JsonProperty(PropertyName = "severityname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SeverityName { get; set; }

        [JsonProperty(PropertyName = "priorityname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string PriorityName { get; set; }

        [JsonProperty(PropertyName = "assignedtoid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? AssignedToID { get; set; }

        [JsonProperty(PropertyName = "assignedtoname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AssignedToName { get; set; }

        [JsonProperty(PropertyName = "assignedtogroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long AssignedToGroupID { get; set; }

        [JsonProperty(PropertyName = "assignedtosupportgroupname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AssignedToSupportgroupName { get; set; }

        [JsonProperty(PropertyName = "userID", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UserID { get; set; }

        [JsonProperty(PropertyName = "supportmembers", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<long> SupportMembers { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "ticketstatusname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TicketStatusName { get; set; }

        [JsonProperty(PropertyName = "loggedByID", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long loggedByID { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }
    }
}
