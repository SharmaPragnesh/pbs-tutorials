using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.Projects
{
    public class ProjectCommunicationResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "communicationPlanMapList", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<long> communicationPlanMapList { get; set; }
    }
}
