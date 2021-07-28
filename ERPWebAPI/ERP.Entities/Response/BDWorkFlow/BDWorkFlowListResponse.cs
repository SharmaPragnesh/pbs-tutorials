using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.BDWorkFlow
{
    public class BDWorkFlowListResponse
    {
        [JsonProperty(PropertyName = "Id")]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "logdate")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime LogDate { get; set; }

        [JsonProperty(PropertyName = "month")]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "logvalue")]
        public string LogValue { get; set; }

        [JsonProperty(PropertyName = "year")]
        public string Year { get; set; }

        [JsonProperty(PropertyName = "workcategoryid")]
        public int workcategoryId { get; set; }

        [JsonProperty(PropertyName = "workcategoryname")]
        public string WorkCategoryName { get; set; }

        [JsonProperty(PropertyName = "isholiday")]
        public bool Isholiday { get; set; }

        [JsonProperty(PropertyName = "isweekend")]
        public bool isweekend { get; set; }


    }
}
