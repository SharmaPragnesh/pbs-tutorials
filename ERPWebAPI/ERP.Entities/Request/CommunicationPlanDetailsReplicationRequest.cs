using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Request
{
    public class CommunicationPlanDetailsReplicationRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "communicationPlanMapList", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<CommunicationPlanDetailsReplicationRequest> communicationPlanMapList { get; set; }
        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
        public string MeetingName { get; set; }
        public long FrequencyID { get; set; }
        public string AgendaDetails { get; set; }
        public string AttendeeName { get; set; }
        public string Communication { get; set; }
        public long CommunicationPlanID { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public long ModifiedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public byte Active { get; set; }
        [JsonProperty(PropertyName = "responseexpectation", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResponseExpectation { get; set; }
    }
}
