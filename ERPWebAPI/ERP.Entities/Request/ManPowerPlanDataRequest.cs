using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class ManPowerPlanDataRequest
    {
        [JsonProperty(PropertyName = "manpowerid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ManPowerId { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "departmentid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long DepartmentId { get; set; }

        [JsonProperty(PropertyName = "headcount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int HeadCount { get; set; }

        [JsonProperty(PropertyName = "allocated_max_hours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Allocated_Max_Hours { get; set; }

        [JsonProperty(PropertyName = "allocatedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int AllocatedHours { get; set; }

        [JsonProperty(PropertyName = "billedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int BilledHours { get; set; }

        [JsonProperty(PropertyName = "average_rate_usd", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Average_Rate_USD { get; set; }

        [JsonProperty(PropertyName = "totalamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal TotalAmount { get; set; }

        [JsonProperty(PropertyName = "usdinrconversion", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal USDINRConversion { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

    }
}
