using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class ResourceRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "name", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "email", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "deptId", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long DepartmentID { get; set; }

        [JsonProperty(PropertyName = "locationId", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long LocationID { get; set; }

        [JsonProperty(PropertyName = "roleId", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long RoleID { get; set; }

        [JsonProperty(PropertyName = "reportingManagerId", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ReportingManagerID { get; set; }

        [JsonProperty(PropertyName = "totalExp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal TotalExperience { get; set; }

        [JsonProperty(PropertyName = "joiningDate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime JoiningDate { get; set; }

        [JsonProperty(PropertyName = "jobRole", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string JobRole { get; set; }

        [JsonProperty(PropertyName = "skilllist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<long> skillList { get; set; }

        [JsonProperty(PropertyName = "expertiseList", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<long> ExpertiseList { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "employeeStatus", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool EmployeeStatus { get; set; }

        [JsonProperty(PropertyName = "lastWorkingDay", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime? LastWorkingDay { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
    }
}
