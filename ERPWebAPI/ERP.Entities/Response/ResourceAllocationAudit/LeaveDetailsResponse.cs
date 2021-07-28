using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ResourceAllocationAudit
{
    public class LeaveDetailsResponse
    {
        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        public List<LeaveDetails> LeaveDetailsList { get; set; }
    }
    public class LeaveDetails
    {
        [JsonProperty(PropertyName = "leavedate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime LeaveDate { get; set; }

        [JsonProperty(PropertyName = "reportingperson", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ReportingPerson { get; set; }
    }
}
