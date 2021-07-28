using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.BDWorkFlow
{
  public  class FilledItemsResponse
    {
        [JsonProperty(PropertyName = "workcategoryid")]
        public long WorkCategoryId { get; set; }

        [JsonProperty(PropertyName = "logdate")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime LogDate { get; set; }

        [JsonProperty(PropertyName = "logvalue")]
        public string LogValue { get; set; }

    }
}
