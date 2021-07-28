using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.BDPlanning
{

     public class BDPlanningListResponse
    {
        [JsonProperty(PropertyName = "departmentid")]
        public long DepartmentId { get; set; }

        [JsonProperty(PropertyName = "departmentname")]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "month")]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "nextyear")]
        public int nextyear { get; set; }

        [JsonProperty(PropertyName = "previousyear")]
        public int previousyear { get; set; }

        [JsonProperty(PropertyName = "year")]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "april")]
        public int April { get; set; }

        [JsonProperty(PropertyName = "may")]
        public int May { get; set; }

        [JsonProperty(PropertyName = "june")]
        public int June { get; set; }

        [JsonProperty(PropertyName = "july")]
        public int July { get; set; }

        [JsonProperty(PropertyName = "august")]
        public int August { get; set; }

        [JsonProperty(PropertyName = "september")]
        public int September { get; set; }

        [JsonProperty(PropertyName = "october")]
        public int October { get; set; }

        [JsonProperty(PropertyName = "november")]
        public int November { get; set; }
     
        [JsonProperty(PropertyName = "december")]
        public int December { get; set; }

        [JsonProperty(PropertyName = "january")]
        public int January { get; set; }

        [JsonProperty(PropertyName = "february")]
        public int February { get; set; }

        [JsonProperty(PropertyName = "march")]
        public int March { get; set; }

    }

}
