using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class ProjectRequest
    {

        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "customerid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CustomerID { get; set; }

        [JsonProperty(PropertyName = "Commercialcontactid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CommercialContactID { get; set; }

        [JsonProperty(PropertyName = "technicalcontactid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TechnicalcontactID { get; set; }

        [JsonProperty(PropertyName = "escalationcontactid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long EscalationContactID { get; set; }

        [JsonProperty(PropertyName = "technologystack", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnologyStack { get; set; }

        [JsonProperty(PropertyName = "customername", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CustomerName { get; set; }

        [JsonProperty(PropertyName = "countryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CountryID { get; set; }

        [JsonProperty(PropertyName = "countryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CountryName { get; set; }


        [JsonProperty(PropertyName = "customertechnicalperson", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnicalCotactPerson { get; set; }

        [JsonProperty(PropertyName = "customercommercialperson", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CommercialContactPerson { get; set; }

        [JsonProperty(PropertyName = "resourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ResourceID { get; set; }

        [JsonProperty(PropertyName = "Resourcebussinesscommercial", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string BussinessCommercialContact { get; set; }

        [JsonProperty(PropertyName = "Resourcebussinesstechnical", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string BussinessTechnicalContact { get; set; }


        [JsonProperty(PropertyName = "Others", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Others { get; set; }


        [JsonProperty(PropertyName = "Remarks", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Remarks { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "tasksourceid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? TaskSourceID { get; set; }

        [JsonProperty(PropertyName = "teamprojectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TeamProjectName { get; set; }

        [JsonProperty(PropertyName = "teamcollectionname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TeamCollectionName { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }

        [JsonProperty(PropertyName = "projectpurposemarkup", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectPurposeMarkup { get; set; }
    }
}
