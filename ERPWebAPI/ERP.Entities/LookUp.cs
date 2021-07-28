using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Entities
{
    public class LookUp
    {
        [JsonProperty(PropertyName = "id")]
        public long? Id { get; set; }

        [JsonProperty(PropertyName = "display_text")]
        public string DisplayText { get; set; }

        [JsonProperty(PropertyName = "display_value")]
        public string DisplayValue { get; set; }

        [JsonProperty(PropertyName = "is_default")]
        public bool IsDefault { get; set; }
    }
}
