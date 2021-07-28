using Newtonsoft.Json;

namespace ERP.Entities.Response.Tasks
{
    public class TaskCategoryListResponse
    {

        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? ProjectId { get; set; }

        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "taskcategoryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskCategoryName { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }

    }
}
