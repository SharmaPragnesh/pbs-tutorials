using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.SupportGroupMembers
{
    public class SupportGroupMembersResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "supportgroupid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long SupportGroupID { get; set; }

        [JsonProperty(PropertyName = "supportgroupname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SupportGroupName { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }

        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }
    }
}
