using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.BDWorkFlow
{
    public class MonthDatesResponse
    {
        [JsonProperty(PropertyName = "logdate")]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime LogDate { get; set; }

        public bool Isholiday { get; set; }

        public bool isweekend { get; set; }
    }
}
