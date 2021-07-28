using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Customer
{
    public class CustomerListResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "customername", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CustomerName { get; set; }

        [JsonProperty(PropertyName = "countryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CountryName { get; set; }

        [JsonProperty(PropertyName = "technicalcontactperson", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnicalCotactPerson { get; set; }

        [JsonProperty(PropertyName = "commercialcontactpesron", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CommercialContactPerson { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long IsActive { get; set; }
    }
}
