using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
   public class ProjectTaskSaveRequest
    {
        [JsonProperty(PropertyName = "taskid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskID { get; set; }

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "tasktitle", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Tasktitle { get; set; }

        [JsonProperty(PropertyName = "taskresourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }


        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "taskstate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Taskstate { get; set; }

        [JsonProperty(PropertyName = "tasksourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? SourceID { get; set; }


        [JsonProperty(PropertyName = "tasksourceName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SourceName { get; set; }

        [JsonProperty(PropertyName = "tasktypeid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskTypeID { get; set; }

        [JsonProperty(PropertyName = "taskestimatedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Estimatedhours { get; set; }

        [JsonProperty(PropertyName = "taskpriority", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskPriority { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
    }
}
