using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.Projects
{
 public class ProjectResponse
    {
        [JsonProperty(PropertyName = "projectid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        /*COMPALSARY*/
        [JsonProperty(PropertyName = "projectname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectName { get; set; }

        [JsonProperty(PropertyName = "customerid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CustomerID { get; set; }

        [JsonProperty(PropertyName = "Commercialcontactid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? CommercialContactID { get; set; }

        [JsonProperty(PropertyName = "technicalcontactid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? TechnicalcontactID { get; set; }

        [JsonProperty(PropertyName = "escalationcontactid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? EscalationContactID { get; set; }

        [JsonProperty(PropertyName = "technologystack", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnologyStack { get; set; }

        /*COMPALSARY*/

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
        public long? ResourceID { get; set; }

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



        [JsonProperty(PropertyName = "projectmemberlistdetails", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ProjectMemberListResponse> ListProjectMemeberDetails { get; set; }

        [JsonProperty(PropertyName = "projectexeccutiondetails", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ProjectExecutionResponse> ListProjectExecutionDetails { get; set; }


        [JsonProperty(PropertyName = "projectcommunicationplandetails", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ProjectCommunicationListResponse> ListProjecCommunicationtDetails { get; set; }

        [JsonProperty(PropertyName = "projectcdeliverabledetails", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ProjectDeliverablesResponse> ListProjectDeliverableDetails { get; set; }


        [JsonProperty(PropertyName = "projectmilestonedetails", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ProjectMilestonesResponse> ListProjectMilestonesDetails { get; set; }

        [JsonProperty(PropertyName = "projectpurposemarkup", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProjectPurposeMarkup { get; set; }
    }
}
