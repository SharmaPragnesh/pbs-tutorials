using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ManPowerPlan
{
    public class ManPowerPlanDetailReponse
    {

        public ManPowerPlanDetailReponse()
        {
            ManPowerPlanDetailsList = new List<ManPowerPlanReponse>();
        }
        [JsonProperty(PropertyName = "manpowerplandetailslist", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ManPowerPlanReponse> ManPowerPlanDetailsList { get; set; }
    }
}
