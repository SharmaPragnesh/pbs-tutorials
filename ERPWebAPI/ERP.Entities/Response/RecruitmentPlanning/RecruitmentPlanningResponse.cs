using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.RecruitmentPlanning
{
    public class RecruitmentPlanningResponse
    {
        [JsonProperty(PropertyName = "departmentname")]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "departmentid")]
        public long DepartmentId { get; set; }

        [JsonProperty(PropertyName = "resourceneeded")]
        public int ResourceNeeded { get; set; }

        [JsonProperty(PropertyName = "month")]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "year")]
        public int Year { get; set; }

    }
}
