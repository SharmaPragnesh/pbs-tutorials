using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.DashBoard
{
   public  class BarChartResponse
    {  
        [JsonProperty(PropertyName = "y")]
        public string y { get; set; }

        [JsonProperty(PropertyName = "a")]
        public int a { get; set; }
    }
}
