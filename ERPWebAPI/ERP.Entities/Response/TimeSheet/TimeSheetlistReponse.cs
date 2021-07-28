using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Response.TimeSheet
{
    public class TImeSheetlistReponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? ProjectId { get; set; }

        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceId { get; set; }

        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        [JsonProperty(PropertyName = "taskcategoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskCategoryId { get; set; }

        [JsonProperty(PropertyName = "taskcategoryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskCategoryName { get; set; }

        [JsonProperty(PropertyName = "timesheetdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime TimeSheetDate { get; set; }

        [JsonProperty(PropertyName = "loggedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal? LoggedHours { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }

        //Task
        [JsonProperty(PropertyName = "estimatedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal? EstimatedHours { get; set; }

        [JsonProperty(PropertyName = "taskdescription", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskDescription { get; set; }

        [JsonProperty(PropertyName = "taskstate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskState { get; set; }

        [JsonProperty(PropertyName = "tasktitle", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskTitle { get; set; }

        [JsonProperty(PropertyName = "taskpriority", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskPriority { get; set; }

        //task Source
        [JsonProperty(PropertyName = "fromsourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long FromSourceId { get; set; }

        [JsonProperty(PropertyName = "fromsourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string fromSourceName { get; set; }
        [JsonProperty(PropertyName = "createdon", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime CreatedOn { get; set; } //#1039
    }
}
