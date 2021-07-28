using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ManPowerPlan
{
      public class ManPowerPlanListResponse
      {
            [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
            public long ID { get; set; }

            [JsonProperty(PropertyName = "financialyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
            public string FinancialYear { get; set; }

            [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
            public bool IsActive { get; set; }      
      }
}
