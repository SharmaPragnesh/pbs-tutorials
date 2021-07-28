using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Projects
{
   public  class ProjectListResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "customerid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CustomerID { get; set; }


        [JsonProperty(PropertyName = "customername", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CustomerName { get; set; }

        [JsonProperty(PropertyName = "countryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CountryID { get; set; }

        [JsonProperty(PropertyName = "countryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CountryName { get; set; }

        [JsonProperty(PropertyName = "engagementmodelid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? EngagementModelID { get; set; }

        [JsonProperty(PropertyName = "engagementmodelname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string EngagementModelName { get; set; }

        [JsonProperty(PropertyName = "customertechnicalperson", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnicalCotactPerson { get; set; }

        [JsonProperty(PropertyName = "customercommercialperson", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CommercialContactPerson { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? ResourceID { get; set; }

        [JsonProperty(PropertyName = "resourcebussinesscommercial", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string BussinessCommercialContact { get; set; }

        [JsonProperty(PropertyName = "resourcebussinesstechnical", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string BussinessTechnicalContact { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "isinproject", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public Boolean IsInProject { get; set; }

        [JsonProperty(PropertyName = "roleenum", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int RoleEnum { get; set; }
    }
}
