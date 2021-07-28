using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Account
{
    public class UserDetailsResponse
    {
        [JsonProperty(PropertyName = "id")]
        public long Id { get; set; }

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
        [JsonProperty(PropertyName = "profileimageurl")]
        public string ProfileImageUrl { get; set; }
    }
}
