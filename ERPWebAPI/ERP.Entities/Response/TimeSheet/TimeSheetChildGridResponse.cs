using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.TimeSheet
{
   public class TimeSheetChildGridResponse
    {
        [JsonProperty(PropertyName = "Tid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TimeID { get; set; }

        [JsonProperty(PropertyName = "loggedhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal? LoggedHours { get; set; }

        [JsonProperty(PropertyName = "taskcategoryname", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string TaskCategoryName { get; set; }

        [JsonProperty(PropertyName = "taskcategoryid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long TaskCategoryId { get; set; }

        [JsonProperty(PropertyName = "timesheetdate")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime TimeSheetDate { get; set; }
        [JsonProperty(PropertyName = "userid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UserId { get; set; }
        [JsonProperty(PropertyName = "createdon", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime CreatedOn { get; set; } //#1039
    }
}
