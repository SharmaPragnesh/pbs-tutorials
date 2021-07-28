using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.CompanyConfigurations
{
    public class CompanyConfigurationsListResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ID { get; set; }

        [JsonProperty(PropertyName = "financialyear", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string FinancialYear { get; set; }

        [JsonProperty(PropertyName = "usd_to_inr_conversion", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal USD_To_INR_Conversion { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

    }
}
