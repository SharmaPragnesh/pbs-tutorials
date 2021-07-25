using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Extension
{
    public class Page<T>
         where T : new()
    {

        private List<T> _list = new List<T>();

        [JsonProperty(PropertyName = "page_count")]
        public long PageCount { get; set; }

        [JsonProperty(PropertyName = "total_count")]
        public long TotalCount { get; set; }

        [JsonProperty(PropertyName = "page_start")]
        public long PageStart { get; set; }

        [JsonProperty(PropertyName = "page_size")]
        public long PageSize { get; set; }

        [JsonProperty(PropertyName = "server_time", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ServerDateTime { get; set; }

        [JsonProperty(PropertyName = "scroll_id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ScrollId { get; set; }

        [JsonProperty(PropertyName = "sort_column", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SortColumn { get; set; }

        [JsonProperty(PropertyName = "sort_order", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SortOrder { get; set; }

        [JsonProperty(PropertyName = "project_last_modified_date", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectLastModifiedDateTime { get; set; }

        [JsonProperty(PropertyName = "task_last_modified_date", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskLastModifiedDateTime { get; set; }

        [JsonProperty(PropertyName = "list")]
        public List<T> List
        {
            get { return _list; }
            set { _list = value; }
        }
    }
}
