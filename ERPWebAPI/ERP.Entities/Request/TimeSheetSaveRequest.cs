using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class TimeSheetSaveRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectId { get; set; }

        [JsonProperty(PropertyName = "taskid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskId { get; set; }

        [JsonProperty(PropertyName = "taskcategoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskCategoryId { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "loggedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal LoggedHours { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }

        [JsonProperty(PropertyName = "timesheetdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime TimesheetDate { get; set; }
    }
}
