using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Request
{
    public class ProjectCommunicationRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "communicationPlanMapList", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ProjectCommunicationRequest> communicationPlanMapList { get; set; }

        public string MeetingName { get; set; }
        public long FrequencyID { get; set; }
        public string AgendaDetails { get; set; }
        public string AttendeeName { get; set; }
        public string Communication { get; set; }
        public long CommunicationPlanID { get; set; }
    }
}
