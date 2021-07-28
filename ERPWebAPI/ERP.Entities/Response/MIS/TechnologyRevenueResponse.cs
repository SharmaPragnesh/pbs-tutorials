using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.MIS
{
    public class TechnologyRevenueResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "technologyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TechnologyId { get; set; }

        [JsonProperty(PropertyName = "technologyname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TechnologyName { get; set; }

        [JsonProperty(PropertyName = "departmentalcost", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DepartmentalCost { get; set; }

        [JsonProperty(PropertyName = "number", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int Number { get; set; }

        [JsonProperty(PropertyName = "directamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DirectAmount { get; set; }

        [JsonProperty(PropertyName = "indirectamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IndirectAmount { get; set; }

        [JsonProperty(PropertyName = "totalamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? TotalAmount { get; set; }

        [JsonProperty(PropertyName = "revenueamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RevenueAmount { get; set; }

        [JsonProperty(PropertyName = "profitorlossamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ProfitOrLossAmount { get; set; }
    }
}
