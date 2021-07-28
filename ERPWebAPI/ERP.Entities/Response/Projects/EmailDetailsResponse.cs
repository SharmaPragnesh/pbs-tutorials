using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Projects
{
    public class EmailDetailsResponse
    {
        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectId { get; set; }

        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "tpm", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TPM { get; set; }

        [JsonProperty(PropertyName = "tpmemail", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TPMEmail { get; set; }

        [JsonProperty(PropertyName = "resourcelist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ResourcesLst> ResourceList { get; set; }

        [JsonProperty(PropertyName = "createdon", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime CreatedOn { get; set; }
    }

    public class ResourcesLst
    {
        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceId { get; set; }

        [JsonProperty(PropertyName = "resourcename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceName { get; set; }

        [JsonProperty(PropertyName = "startdate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime StartDate { get; set; }

        [JsonProperty(PropertyName = "enddate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime EndDate { get; set; }

        [JsonProperty(PropertyName = "resourceemail", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ResourceEmail { get; set; }

        [JsonProperty(PropertyName = "roleid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long RoleId { get; set; }

        [JsonProperty(PropertyName = "projectrolename", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectRoleName { get; set; }
    }
}
