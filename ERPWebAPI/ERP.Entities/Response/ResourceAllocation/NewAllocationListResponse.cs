using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ResourceAllocation
{
    public class NewAllocationListResponse
    {
        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceId { get; set; }

        [JsonProperty(PropertyName = "billablehourslist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<int> BillableHoursList { get; set; }
    }
}
