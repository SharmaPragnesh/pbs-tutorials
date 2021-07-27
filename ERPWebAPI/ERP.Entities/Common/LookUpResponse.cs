using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Entities.Common
{
    public class LookUpResponse
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
