using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.DashBoard
{
    public class PieChartResponse
    {
      

        [JsonProperty(PropertyName = "departmentName")]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "ratio")]
        public int Ratio { get; set; }

    }

}
