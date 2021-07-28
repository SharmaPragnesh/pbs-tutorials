using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ManPowerPlan
{
    public class ManPowerPlanTabResponse
    {
        [JsonProperty(PropertyName = "financialyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FinancialYear { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Month { get; set; }

        [JsonProperty(PropertyName = "manpowerplantablist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ManPowerPlanReponse> ManPowerPlanTabList { get; set; }

    }
}
