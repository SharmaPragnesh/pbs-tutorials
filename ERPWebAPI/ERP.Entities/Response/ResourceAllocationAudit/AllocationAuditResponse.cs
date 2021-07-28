using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ResourceAllocationAudit
{
    public class AllocationAuditResponse
    {
        [JsonProperty(PropertyName = "auditlist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<AuditList> AuditList { get; set; }       
    }
    public class AuditList
    {
        [JsonProperty(PropertyName = "allocationid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long AllocationId { get; set; }

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectId { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceId { get; set; }

        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        [JsonProperty(PropertyName = "allocationdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime AllocationDate { get; set; }

        [JsonProperty(PropertyName = "billablehours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int BillableHours { get; set; }

        [JsonProperty(PropertyName = "isonleave", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsOnLeave { get; set; }
    }
}
