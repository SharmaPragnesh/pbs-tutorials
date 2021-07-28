using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
   public class CustomerRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "customername", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CustomerName { get; set; }

        [JsonProperty(PropertyName = "countryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CountryID { get; set; }

        [JsonProperty(PropertyName = "countryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CountryName { get; set; }

        [JsonProperty(PropertyName = "companyurl", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CompanyURL { get; set; }

        [JsonProperty(PropertyName = "otherinfo", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string OtherInfo { get; set; }

        [JsonProperty(PropertyName = "technicallevelid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TechnicalLevelID { get; set; }

        [JsonProperty(PropertyName = "technicalcontactperson", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnicalCotactPerson { get; set; }

        [JsonProperty(PropertyName = "commercialcontactpesron", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CommercialContactPerson { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
    }
}
