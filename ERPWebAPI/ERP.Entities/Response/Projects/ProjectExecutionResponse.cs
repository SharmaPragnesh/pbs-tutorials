using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.Projects
{
   public class ProjectExecutionResponse
    {

        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "specifyengagementmodelname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SpecifyEngagementModelName { get; set; }

        [JsonProperty(PropertyName = "engagementmodelid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? EngagementModelID { get; set; }

        [JsonProperty(PropertyName = "providedguided", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ProvidedGuided { get; set; }
        [JsonProperty(PropertyName = "engagementmodelname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string EngagementModelName { get; set; }

        [JsonProperty(PropertyName = "coderepositoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? CodeRepositoryID { get; set; }

        [JsonProperty(PropertyName = "coderepositoryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CodeRepositoryName { get; set; }

        [JsonProperty(PropertyName = "softwaredevelopmentprocessid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? SoftwareDevelopmentProcessID { get; set; }

        [JsonProperty(PropertyName = "softwaredevelopmentprocessname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SoftwareDevelopmentProcessName { get; set; }

        [JsonProperty(PropertyName = "projecttypeid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long? ProjectTypeID { get; set; }

        [JsonProperty(PropertyName = "changeHandlingdetails", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ChangeHandlingDetails { get; set; }

        [JsonProperty(PropertyName = "estimatedteamsize", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Estimated_team_size { get; set; }

        [JsonProperty(PropertyName = "codeguidelinesbycustomer", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CodeGuidelinesByCustomer { get; set; }

        [JsonProperty(PropertyName = "uatperioddurationagreed", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string UATPeriodDurationAgreed { get; set; }

        [JsonProperty(PropertyName = "freemaintenanceduration", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FreeMaintenanceDuration { get; set; }

        [JsonProperty(PropertyName = "signoffauthority", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string SignOffAuthority { get; set; }

        [JsonProperty(PropertyName = "progressreportid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<long> ProgressReportID { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "estimatedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal? EstimatedHours { get; set; }
    }


}
