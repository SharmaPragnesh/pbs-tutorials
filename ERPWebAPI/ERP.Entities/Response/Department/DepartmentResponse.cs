using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Department
{
    public class DepartmentResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "name", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "ismetastaff", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsMetaStaff { get; set; }

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
