using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Request
{
    public class MonthlyProjectAllocationRequest
    {
        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Month { get; set; }

        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Year { get; set; }

        [JsonProperty(PropertyName = "pids", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string pIDs { get; set; }

        [JsonProperty(PropertyName = "projectids", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<long> ProjectIDs { get; set; }

        [JsonProperty(PropertyName = "monthName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string MonthName { get; set; }
    }
}
