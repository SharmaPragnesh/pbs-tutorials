using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class Profile
    {
        [JsonProperty(PropertyName = "id")]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "roleid")]
        public long RoleId { get; set; }

        [JsonProperty(PropertyName = "rolename")]
        public string RoleName { get; set; }

        [JsonProperty(PropertyName = "moduleids")]
        public List<int> ModuleIds { get; set; }

        [JsonProperty(PropertyName = "landingurl")]
        public string LandingURL { get; set; }

        public string Email { get; set; }
        public string Designation { get; set; }
        public long Depa { get; set; }
        public string ReportingToName { get; set; }
        public string Location { get; set; }
        public string Department { get; set; }

        public string Image { get; set; }
        [JsonProperty(PropertyName = "isattachment", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool IsAttachment { get; set; }

        [JsonProperty(PropertyName = "filename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> FileName { get; set; }

        [JsonProperty(PropertyName = "filepath", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> FilePath { get; set; }

        [JsonProperty(PropertyName = "extension", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> Extension { get; set; }

        [JsonProperty(PropertyName = "contenttype", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> ContentType { get; set; }
        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
    }
}
