using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.BDPlanning
{
    public class BDPlanningResponse
    {
        [JsonProperty(PropertyName = "departmentid")]
        public long DepartmentId { get; set; }

        [JsonProperty(PropertyName = "departmentname")]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "month")]
        public int Month { get; set; }


        [JsonProperty(PropertyName = "year")]
        public int year { get; set; }

        [JsonProperty(PropertyName = "billedhours")]
        public int BilledHours { get; set; }
    }
}
