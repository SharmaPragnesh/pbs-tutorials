using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class ResourceSourceControlMapRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceId { get; set; }

        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        [JsonProperty(PropertyName = "sourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long SourceId { get; set; }

        [JsonProperty(PropertyName = "sourceName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SourceName { get; set; }

        [JsonProperty(PropertyName = "assignedtoname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AssignedToName { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
    }
}
