using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class TicketCategoryGroupMapRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "ticketcategoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TicketCategoryID { get; set; }

        [JsonProperty(PropertyName = "l1ticketsupportgroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long L1TicketSupportGroupID { get; set; }

        [JsonProperty(PropertyName = "l1resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? L1ResourceID { get; set; }

        [JsonProperty(PropertyName = "l2ticketsupportgroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? L2TicketSupportGroupID { get; set; }

        [JsonProperty(PropertyName = "l2resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? L2ResourceID { get; set; }

        [JsonProperty(PropertyName = "l3ticketsupportgroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? L3TicketSupportGroupID { get; set; }

        [JsonProperty(PropertyName = "l3resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? L3ResourceID { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }
    }
}
