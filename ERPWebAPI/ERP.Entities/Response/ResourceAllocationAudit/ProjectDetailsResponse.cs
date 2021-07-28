using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ResourceAllocationAudit
{
    public class ProjectDetailsResponse
    {
        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        public List<ProjectDetails> ProjectDetailsList { get; set; }
    }
    public class ProjectDetails
    {
        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "allocatedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int AllocatedHours { get; set; }
    }
}
