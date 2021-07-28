using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Request
{
    public class BDWorkFlowRequest
    {
        [JsonProperty(PropertyName = "workcategoryid")]
        public long WorkCategoryId { get; set; }

        [JsonProperty(PropertyName = "logdate")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime LogDate { get; set; }

        [JsonProperty(PropertyName = "logvalue")]
        public string LogValue { get; set; }

        [JsonProperty(PropertyName = "month")]
        public string Month { get; set; }

        [JsonProperty(PropertyName = "year")]
        public string Year { get; set; }

        [JsonProperty(PropertyName = "resourceid")]
        public int ResouceId { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }
    }
}
