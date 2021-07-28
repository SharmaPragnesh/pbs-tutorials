using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.MIS
{
    public class MisDashboardResponse
    {
        [JsonProperty(PropertyName = "technology", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Technology { get; set; }

        [JsonProperty(PropertyName = "profitpermonth", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<MonthwiseProfit> ProfitPerMonth { get; set; }

        [JsonProperty(PropertyName = "q1profit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Q1Profit { get; set; }

        [JsonProperty(PropertyName = "q2profit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Q2Profit { get; set; }

        [JsonProperty(PropertyName = "q3profit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Q3Profit { get; set; }

        [JsonProperty(PropertyName = "q4profit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Q4Profit { get; set; }

        [JsonProperty(PropertyName = "overallprofit", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? OverallProfit { get; set; }
    }

    public class MonthwiseProfit
    {
        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "monthid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int MonthId { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Month { get; set; }

        [JsonProperty(PropertyName = "profitamt", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ProfitAmt { get; set; }
    }
}
