using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.TimeSheet
{
    public class TimesheetWeeklyResponse
    {
        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectId { get; set; }

        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "datewisedata", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<DatewiseTimesheet> DatewiseData { get; set; }
    }

    public class DatewiseTimesheet
    {
        [JsonProperty(PropertyName = "timesheetdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime TimesheetDate { get; set; }

        [JsonProperty(PropertyName = "hours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Hours { get; set; }
    }
}
