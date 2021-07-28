using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Request
{
    public class ManPowerPlanDetailsRequest
    {

        [JsonProperty(PropertyName = "manpowerplanid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ManPowerId { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Year { get; set; }

        public ManPowerPlanDetailsRequest()
        {
            ManPowerPlanDetailsList = new List<ManPowerPlanDataRequest>();
        }
        [JsonProperty(PropertyName = "manpowerplandetailslist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ManPowerPlanDataRequest> ManPowerPlanDetailsList { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
    }
}
