using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Holidays
{
   public class HolidaysListResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "holidaydate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime HolidayDate { get; set; }

        [JsonProperty(PropertyName = "occassion", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Occassion { get; set; }

        [JsonProperty(PropertyName = "compensationon", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public Nullable<DateTime> CompensationOn { get; set; }

        [JsonProperty(PropertyName = "isfirsthalf", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsFirstHalf { get; set; }

        [JsonProperty(PropertyName = "issecondhalf", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsSecondHalf { get; set; }

    }
}
