using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.WorkCategory
{
   public class WorkCategoryReponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "workcategory", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string WorkCategory { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "displayorder", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int? DisplayOrder { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }
    }
}
