using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.ResourceAllocationAudit
{
    public class ResourceAllocationAuditResponse
    {

        [JsonProperty(PropertyName = "deptname")]
        public string Deptname { get; set; }

        [JsonProperty(PropertyName = "apr18")]
        public int Apr18 { get; set; }

        [JsonProperty(PropertyName = "may18")]
        public int May18 { get; set; }

        [JsonProperty(PropertyName = "jun18")]
        public int Jun18 { get; set; }

        [JsonProperty(PropertyName = "jul8")]
        public int Jul18 { get; set; }

        [JsonProperty(PropertyName = "aug18")]
        public int Aug18 { get; set; }

        [JsonProperty(PropertyName = "sep18")]
        public int Sep18 { get; set; }

        [JsonProperty(PropertyName = "oct18")]
        public int Oct18 { get; set; }

        [JsonProperty(PropertyName = "nov18")]
        public int Nov18 { get; set; }

        [JsonProperty(PropertyName = "dec18")]
        public int Dec18 { get; set; }

        [JsonProperty(PropertyName = "jan19")]
        public int Jan19 { get; set; }

        [JsonProperty(PropertyName = "feb19")]
        public int Feb19 { get; set; }

        [JsonProperty(PropertyName = "mar19")]
        public int Mar19 { get; set; }

    }
}
