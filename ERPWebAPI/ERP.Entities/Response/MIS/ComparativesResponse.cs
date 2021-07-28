using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.MIS
{
    public class ComparativesResponse
    {
        [JsonProperty(PropertyName = "misid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long MisId { get; set; }

        [JsonProperty(PropertyName = "salesamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SalesAmount { get; set; }

        [JsonProperty(PropertyName = "yearandmonth", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string YearAndMonth { get; set; }

        [JsonProperty(PropertyName = "interestincomeamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestIncomeAmount { get; set; }

        [JsonProperty(PropertyName = "jobworkchargesamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? JobworkChargesAmount { get; set; }

        [JsonProperty(PropertyName = "interestcost", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestCost { get; set; }

        [JsonProperty(PropertyName = "rentalamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RentalAmount { get; set; }

        [JsonProperty(PropertyName = "foreigntravelamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ForeignTravelAmount { get; set; }

        [JsonProperty(PropertyName = "employeecost", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? EmployeeCost { get; set; }

        [JsonProperty(PropertyName = "comments", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Comments { get; set; }

        [JsonProperty(PropertyName = "depreciationamount", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DepreciationAmount { get; set; }

        [JsonProperty(PropertyName = "jobworkchargespercent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? JobworkChargesPercent { get; set; }

        [JsonProperty(PropertyName = "employeesexppercent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? EmployeesExpPercent { get; set; }

        [JsonProperty(PropertyName = "indirectexppercent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IndirectExpPercent { get; set; }

        [JsonProperty(PropertyName = "businesspromotionexppercent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BusinessPromotionExpPercent { get; set; }

        [JsonProperty(PropertyName = "interestexppercent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestExpPercent { get; set; }

        [JsonProperty(PropertyName = "salarynperquisitesofmdpercent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SalaryNPerquisitesOfMdPercent { get; set; }
    }
}
