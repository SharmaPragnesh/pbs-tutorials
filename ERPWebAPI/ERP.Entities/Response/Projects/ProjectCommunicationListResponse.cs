using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.Projects
{
    public class ProjectCommunicationListResponse
    {
        [JsonProperty(PropertyName = "communicationPlanID", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CommunicationPlanID { get; set; }

        [JsonProperty(PropertyName = "meetingName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string MeetingName { get; set; }
        [JsonProperty(PropertyName = "frequencyId", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long FrequencyID { get; set; }

        [JsonProperty(PropertyName = "frequencyName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FrequencyName { get; set; }

        [JsonProperty(PropertyName = "attendeesName", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AttendeesName { get; set; }

        [JsonProperty(PropertyName = "agendaDetails", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string AgendaDetails { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }
        public string ResponseExpectation { get; set; }

    }
}
