using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
   public class BDPlanningRequest
    {
        [JsonProperty(PropertyName = "month")]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "year")]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "departmentid")]
        public long DepartmentID { get; set; }

        [JsonProperty(PropertyName = "details")]
        public string Details { get; set; }
    }
}
