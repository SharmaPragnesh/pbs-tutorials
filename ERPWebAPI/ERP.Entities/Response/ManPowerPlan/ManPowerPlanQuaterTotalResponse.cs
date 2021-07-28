using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Entities.Response.ManPowerPlan
{
    
    public class ManPowerPlanQuaterTotalResponse
    {
        [JsonProperty(PropertyName = "quaterhours", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<ManPowerPlanQuatterHours> QuaterHours { get; set; }
    }

    public class ManPowerPlanQuatterHours
    {
        [JsonProperty(PropertyName = "quaternumber", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int QuaterNumber { get; set; }

        [JsonProperty(PropertyName = "meta", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal Meta { get; set; }

        [JsonProperty(PropertyName = "nonmeta", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public decimal NonMeta { get; set; }
    }
    /*[JsonProperty(PropertyName = "nonmeta1", DefaultValueHandling = DefaultValueHandling.Ignore)]
    public decimal? nonMeta1 { get; set; }

    //   [JsonProperty(PropertyName = "nonmeta2", DefaultValueHandling = DefaultValueHandling.Ignore)]
    // public decimal nonMeta2 { get; set; }

    [JsonProperty(PropertyName = "nonmeta2", DefaultValueHandling = DefaultValueHandling.Ignore)]
    public List<nonmeta2> nonmeta2 { get; set; }

    [JsonProperty(PropertyName = "meta1", DefaultValueHandling = DefaultValueHandling.Ignore)]
    public List<meta1> meta1 { get; set; }

    [JsonProperty(PropertyName = "meta2", DefaultValueHandling = DefaultValueHandling.Ignore)]
    public List<meta2> meta2 { get; set; }
}


public class nonmeta2
{
    [JsonProperty(PropertyName = "nonmeta2", DefaultValueHandling = DefaultValueHandling.Ignore)]
    public decimal? nonMeta2 { get; set; }
}
public class meta1
{
    [JsonProperty(PropertyName = "meta1", DefaultValueHandling = DefaultValueHandling.Ignore)]
    public decimal? Meta1 { get; set; }
}
public class meta2
{
    [JsonProperty(PropertyName = "meta2", DefaultValueHandling = DefaultValueHandling.Ignore)]
    public decimal? Meta2 { get; set; }
}*/
}
