using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.MIS
{
    public class DashboardBarChartResponse
    {
        [JsonProperty(PropertyName = "monthid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int MonthId { get; set; }

        [JsonProperty(PropertyName = "monthname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string MonthName { get; set; }

        [JsonProperty(PropertyName = "technologywiseprofitdata", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<TechnologyWiseProfitResponse> TechnologywiseProfitData { get; set; }
    }
    public class TechnologyWiseProfitResponse
    {
        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "deptid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long DeptId { get; set; }

        [JsonProperty(PropertyName = "technologyname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnologyName { get; set; }

        [JsonProperty(PropertyName = "profitamt", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ProfitAmt { get; set; }
    }
}
