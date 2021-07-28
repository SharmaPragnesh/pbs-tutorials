using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.DashBoard
{
    public class DashboardResponse
    {
        [JsonProperty(PropertyName = "currentprojects")]
        public int currentprojects  { get; set; }
       
        [JsonProperty(PropertyName = "billablehourslastmonth")]
        public int BillableHoursLastMonth { get; set; }

        [JsonProperty(PropertyName = "billablehoursthismonth")]
        public int BillableHoursThisMonth { get; set; }

        [JsonProperty(PropertyName = "plannedhoursnextmonth")]
        public int PlannedHoursNextMonth { get; set; }
    }
}
