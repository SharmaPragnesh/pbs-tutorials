using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.TimeSheet
{
    public class TimeSheetGridResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }
        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "tasktitle", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskTitle { get; set; }

        [JsonProperty(PropertyName = "estimatedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal? EstimatedHours { get; set; }

        [JsonProperty(PropertyName = "taskdescription", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Taskdescription { get; set; }

        [JsonProperty(PropertyName = "state", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string State { get; set; }

        [JsonProperty(PropertyName = "tasktype", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskType { get; set; }

        [JsonProperty(PropertyName = "tasktypevalue", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskTypeValue { get; set; }

        [JsonProperty(PropertyName = "priority", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Priority { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }

        [JsonProperty(PropertyName = "assignedto", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long AssignedTo { get; set; }

        [JsonProperty(PropertyName = "assignedtoname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AssignedToName { get; set; }

        [JsonProperty(PropertyName = "spenthours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal? SpentHours { get; set; }

        [JsonProperty(PropertyName = "enumforrole", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int EnumForRole { get; set; }

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectId { get; set; }

        [JsonProperty(PropertyName = "createdon", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime CreatedOn { get; set; }
    }
}
