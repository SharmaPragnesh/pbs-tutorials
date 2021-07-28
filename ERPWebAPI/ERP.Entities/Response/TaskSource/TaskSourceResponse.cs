﻿using Newtonsoft.Json;

namespace ERP.Entities.Response.TaskSource
{
    public class TaskSourceResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "sourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SourceName { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }
    }
}