using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.TimeSheet
{
    public class TimeSheetModelpopupResponse
    {
        [JsonProperty(PropertyName = "selproject", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long selproject { get; set; }

        [JsonProperty(PropertyName = "seltask", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long seltask { get; set; }

        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "loggedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal? LoggedHours { get; set; }

        [JsonProperty(PropertyName = "selprojectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string selprojectName { get; set; }

        [JsonProperty(PropertyName = "seltaskname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string seltaskName { get; set; }

        [JsonProperty(PropertyName = "taskcategoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskcategoryId { get; set; }

        [JsonProperty(PropertyName = "timesheetdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime TimesheetDate { get; set; }
    }
}
