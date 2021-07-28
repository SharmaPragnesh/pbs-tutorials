using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class SupportTicketRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "ticketdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime TicketDate { get; set; }

        [JsonProperty(PropertyName = "tickettypeid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TicketTypeID { get; set; }

        [JsonProperty(PropertyName = "categoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CategoryID { get; set; }

        [JsonProperty(PropertyName = "ticketseverityid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TicketSeverityID { get; set; }

        [JsonProperty(PropertyName = "ticketpriorityid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TicketPriorityID { get; set; }

        [JsonProperty(PropertyName = "assignedtoid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? AssignedToID { get; set; }

        [JsonProperty(PropertyName = "assignedtosupportgroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long AssignedToSupportGroupID { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "ticketstatusid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int TicketStatusID { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }

        [JsonProperty(PropertyName = "filename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> FileName { get; set; }

        [JsonProperty(PropertyName = "filepath", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> FilePath { get; set; }

        [JsonProperty(PropertyName = "extension", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> Extension { get; set; }

        [JsonProperty(PropertyName = "contenttype", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> ContentType { get; set; }

        [JsonProperty(PropertyName = "isattachment", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsAttachment { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "isticketchangefromhistory", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsTicketChangeFromHistory { get; set; }
    }
}
