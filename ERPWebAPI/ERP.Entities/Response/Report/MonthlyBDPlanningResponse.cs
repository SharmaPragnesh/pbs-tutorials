using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Report
{
    public class MonthlyBDPlanningResponse
    {
        [JsonProperty(PropertyName = "departmentname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "projecthours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int ProjectHours { get; set; }

        [JsonProperty(PropertyName = "remarks", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Remarks { get; set; }
    }
}
