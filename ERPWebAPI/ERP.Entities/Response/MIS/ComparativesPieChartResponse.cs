using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.MIS
{
    public class ComparativesPieChartResponse
    {
        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "jwcpercentage", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? JwcPercentage { get; set; }

        [JsonProperty(PropertyName = "empexppercentage", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? EmpExpPercentage { get; set; }

        [JsonProperty(PropertyName = "indirectexppercentage", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IndirectExpPercentage { get; set; }

        [JsonProperty(PropertyName = "businesspromotionpercentage", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BusinessPromotionPercentage { get; set; }

        [JsonProperty(PropertyName = "interestpercentage", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestPercentage { get; set; }

        [JsonProperty(PropertyName = "salaryperqmdpercentage", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SalaryPerqMdPercentage { get; set; }
    }
}
