using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.MIS
{
    public class MisBarChartResponse
    {
        [JsonProperty(PropertyName = "Latestyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int? LatestYear { get; set; }

        [JsonProperty(PropertyName = "prevyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int? PrevYear { get; set; }

        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<int?> Years { get; set; }

        [JsonProperty(PropertyName = "monthid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int MonthId { get; set; }

        [JsonProperty(PropertyName = "monthname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string MonthName { get; set; }

         public string ProfitAmountArray { get; set; 
        }       
    }
}
