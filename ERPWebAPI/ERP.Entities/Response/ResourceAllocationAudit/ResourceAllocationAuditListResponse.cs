using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.ResourceAllocationAudit
{

    public class ResourceAllocationAuditListResponse
    {

        [JsonProperty(PropertyName = "deptname")]
        public string Deptname { get; set; }

        [JsonProperty(PropertyName = "apr")]
        public int Apr{ get; set; }

        [JsonProperty(PropertyName = "aprplus")]
        public int aprPlus { get; set; }

        [JsonProperty(PropertyName = "aprminus")]
        public int aprMinus { get; set; }

        [JsonProperty(PropertyName = "may")]
        public int May { get; set; }

        [JsonProperty(PropertyName = "mayplus")]
            public int mayPlus { get; set; }

        [JsonProperty(PropertyName = "mayminus")]
        public int mayMinus { get; set; }

        [JsonProperty(PropertyName = "jun")]
        public int Jun{ get; set; }

        [JsonProperty(PropertyName = "junplus")]
        public int junPlus { get; set; }

        [JsonProperty(PropertyName = "junminus")]
        public int junMinus { get; set; }

        [JsonProperty(PropertyName = "jul")]
        public int Jul{ get; set; }

        [JsonProperty(PropertyName = "julplus")]
        public int julPlus { get; set; }

        [JsonProperty(PropertyName = "julminus")]
        public int julMinus { get; set; }

        [JsonProperty(PropertyName = "aug")]
        public int Aug { get; set; }

        [JsonProperty(PropertyName = "augplus")]
        public int augPlus { get; set; }

        [JsonProperty(PropertyName = "augminus")]
        public int augMinus { get; set; }

        [JsonProperty(PropertyName = "sep")]
        public int Sep { get; set; }
        [JsonProperty(PropertyName = "sepplus")]
        public int sepPlus { get; set; }

        [JsonProperty(PropertyName = "sepminus")]
        public int sepMinus { get; set; }

        [JsonProperty(PropertyName = "oct")]
        public int Oct { get; set; }
        [JsonProperty(PropertyName = "octplus")]
        public int octPlus { get; set; }

        [JsonProperty(PropertyName = "octminus")]
        public int octMinus { get; set; }

        [JsonProperty(PropertyName = "nov")]
        public int Nov { get; set; }
        [JsonProperty(PropertyName = "novplus")]
        public int novPlus { get; set; }

        [JsonProperty(PropertyName = "novminus")]
        public int novMinus { get; set; }

        [JsonProperty(PropertyName = "dec")]
        public int Dec { get; set; }
        [JsonProperty(PropertyName = "decplus")]
        public int decPlus { get; set; }

        [JsonProperty(PropertyName = "decminus")]
        public int decMinus { get; set; }

        [JsonProperty(PropertyName = "jan")]
        public int Jan { get; set; }
        [JsonProperty(PropertyName = "janplus")]
        public int janPlus { get; set; }

        [JsonProperty(PropertyName = "janminus")]
        public int janMinus { get; set; }

        [JsonProperty(PropertyName = "feb")]
        public int Feb { get; set; }
        [JsonProperty(PropertyName = "febplus")]
        public int febPlus { get; set; }

        [JsonProperty(PropertyName = "febminus")]
        public int febMinus { get; set; }

        [JsonProperty(PropertyName = "mar")]
        public int Mar { get; set; }
        [JsonProperty(PropertyName = "marplus")]
        public int marPlus { get; set; }

        [JsonProperty(PropertyName = "marminus")]
        public int marMinus { get; set; }
    }
}
