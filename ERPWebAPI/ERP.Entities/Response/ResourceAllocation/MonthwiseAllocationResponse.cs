using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ResourceAllocation
{
    public class MonthwiseAllocationResponse
    {
        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectId { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }

        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        [JsonProperty(PropertyName = "resourcerange", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<DateTime> ResourceRange { get; set; }

        [JsonProperty(PropertyName = "isallocated", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<bool> IsAllocatedRange { get; set; }
    }
}
