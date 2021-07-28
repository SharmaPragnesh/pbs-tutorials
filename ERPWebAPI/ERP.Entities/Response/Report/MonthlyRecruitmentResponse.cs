using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Report
{
    public class MonthlyRecruitmentResponse
    {

        [JsonProperty(PropertyName = "departmentname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "headcount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int HeadCount { get; set; }

        [JsonProperty(PropertyName = "remarks", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Remarks { get; set; }

    }
}
