using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class ResourceAllocationRequest
    {
        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }

        [JsonProperty(PropertyName = "currentmonth", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int CurrentMonth { get; set; }

        [JsonProperty(PropertyName = "currentyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int CurrentYear { get; set; }

        [JsonProperty(PropertyName = "allocationlist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<AllocationListModel> AllocationList { get; set; }
    }
    public class AllocationListModel
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
