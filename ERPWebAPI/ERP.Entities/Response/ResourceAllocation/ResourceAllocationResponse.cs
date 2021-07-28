using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ResourceAllocation
{
    public class ResourceAllocationResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }

        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "startdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime StartDate { get; set; }

        [JsonProperty(PropertyName = "enddate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime EndDate { get; set; }

        [JsonProperty(PropertyName = "allocationlist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ResourceAllocationListModel> AllocationList { get; set; }

        [JsonProperty(PropertyName = "defaulthours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int DefaultHours { get; set; }
    }
    public class ResourceAllocationListModel
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }

        [JsonProperty(PropertyName = "date", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime Date { get; set; }

        [JsonProperty(PropertyName = "billablehours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int BillableHours { get; set; }

        [JsonProperty(PropertyName = "isonleave", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsOnLeave { get; set; }
    }
}
