using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ManPowerPlan
{
    public class ManPowerPlanReponse
    {

        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "manPowerId", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ManPowerID { get; set; }

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

        [JsonProperty(PropertyName = "ismeta")]
        public bool IsMeta { get; set; }

        [JsonProperty(PropertyName = "usdinrconversion", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal USDINRConversion { get; set; }

        //department table field
        [JsonProperty(PropertyName = "departmentname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string DepartmentName { get; set; }
        
        //department configuration fields
        [JsonProperty(PropertyName = "attended_hours_per_month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Attended_Hours_Per_Month { get; set; }

        [JsonProperty(PropertyName = "attended_to_allocated_ratio", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Attended_To_Allocated_Ratio { get; set; }

        [JsonProperty(PropertyName = "attended_to_billable_ratio", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Attended_To_Billable_Ratio { get; set; }

        [JsonProperty(PropertyName = "avg_rate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Avg_Rate { get; set; }

        [JsonProperty(PropertyName = "monthly_avg_exp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Monthly_Avg_Exp { get; set; }

    }
}
