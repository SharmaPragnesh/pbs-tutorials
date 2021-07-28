using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Account
{
    public class UserProfileResponse
    {
        [JsonProperty(PropertyName = "id")]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "roleid")]
        public long RoleId { get; set; }

        [JsonProperty(PropertyName = "rolename")]
        public string RoleName { get; set; }

        public string Email { get; set; }
        public string Designation { get; set; }
        public string ReportingToName { get; set; }
        public string Location { get; set; }
        public string Department { get; set; }

        public string Image { get; set; }
    }
}
