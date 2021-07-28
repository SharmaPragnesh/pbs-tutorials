using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Report
{
    public class MonthlyProjectAllocationResponse
    {        
        public MonthlyProjectAllocationResponse()
        {
            RoleWiseHoursList= new List<RoleWiseHoursResponse>();

            ResourceWiseHoursList = new List<ResourceWiseHoursResponse>();
        }

        [JsonProperty(PropertyName = "projectName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "rolewisehourslist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<RoleWiseHoursResponse> RoleWiseHoursList { get; set; }

        [JsonProperty(PropertyName = "resourcewisehourslist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ResourceWiseHoursResponse> ResourceWiseHoursList { get; set; }

    }

    public class RoleWiseHoursResponse
    {
        [JsonProperty(PropertyName = "billedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long BilledHours { get; set; }

        [JsonProperty(PropertyName = "roleName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string RoleName { get; set; }

        [JsonProperty(PropertyName = "roleId", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long RoleID { get; set; }
    }

    public class ResourceWiseHoursResponse
    {
        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceId { get; set; }

        [JsonProperty(PropertyName = "billedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long BilledHours { get; set; }

        [JsonProperty(PropertyName = "resourceName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }
    }
}
