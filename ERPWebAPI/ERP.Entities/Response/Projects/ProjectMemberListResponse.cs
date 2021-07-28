using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.Projects
{
   public class ProjectMemberListResponse
    {
        [JsonProperty(PropertyName = "projectMemberid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectMemberID { get; set; }

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }

        [JsonProperty(PropertyName = "startdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime StartDate { get; set; }

        [JsonProperty(PropertyName = "enddate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime EndDate { get; set; }

        [JsonProperty(PropertyName = "roleid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long RoleID { get; set; }

        [JsonProperty(PropertyName = "technicalcapability", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TechnicalCapability { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "defaulthour", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int DefaultHour { get; set; }

    }
}
