using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Resource
{
    public class ResourceListResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "name", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "email", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "deptid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long DepartmentID { get; set; }

        [JsonProperty(PropertyName = "deptname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "roleid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long RoleID { get; set; }

        [JsonProperty(PropertyName = "rolename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string RoleName { get; set; }

        [JsonProperty(PropertyName = "joiningdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime JoiningDate { get; set; }

        [JsonProperty(PropertyName = "totalexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal TotalExperience { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "employeestatus", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool EmployeeStatus { get; set; }
    }
}
