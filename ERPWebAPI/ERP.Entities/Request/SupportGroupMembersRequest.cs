using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class SupportGroupMembersRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "supportGroupID", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long SupportGroupID { get; set; }

        [JsonProperty(PropertyName = "resourceID", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }
    }
}
