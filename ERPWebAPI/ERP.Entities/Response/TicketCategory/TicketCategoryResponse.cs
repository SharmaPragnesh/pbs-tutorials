using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.TicketCategory
{
    public class TicketCategoryResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "ticketcategory", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TicketCategory { get; set; }

        [JsonProperty(PropertyName = "parentid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? ParentID { get; set; }

        [JsonProperty(PropertyName = "parentticketcategory", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ParentTicketCategory { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }
    }
}
