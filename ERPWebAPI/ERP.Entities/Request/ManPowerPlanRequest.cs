using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class ManPowerPlanRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Month { get; set; }

        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Year { get; set; }

        [JsonProperty(PropertyName = "departmentid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long DepartmentId { get; set; }

        [JsonProperty(PropertyName = "headcount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long HeadCount { get; set; }

        [JsonProperty(PropertyName = "allocated_max_hours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Allocated_Max_Hours { get; set; }

        [JsonProperty(PropertyName = "allocatedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long AllocatedHours { get; set; }

        [JsonProperty(PropertyName = "billedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long BilledHours { get; set; }

        [JsonProperty(PropertyName = "average_rate_usd", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Average_Rate_USD { get; set; }

        [JsonProperty(PropertyName = "totalamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal TotalAmount { get; set; }

        [JsonProperty(PropertyName = "financialyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FinancialYear { get; set; }
    }
}
