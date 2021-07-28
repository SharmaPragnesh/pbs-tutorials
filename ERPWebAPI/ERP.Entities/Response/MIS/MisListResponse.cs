using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.MIS
{
    public class MisListResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "monthyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string MonthYear { get; set; }

        [JsonProperty(PropertyName = "totalincomeamt", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? TotalIncomeAmt { get; set; }

        [JsonProperty(PropertyName = "totalexpenseamt", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? TotalExpenseAmt { get; set; }

        [JsonProperty(PropertyName = "profitlossamt", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ProfitLossAmt { get; set; }
    }
}
