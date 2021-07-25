using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Extension
{
    public class ApiResult<T>
    {
        [JsonProperty(Order = 5, PropertyName = "data", NullValueHandling = NullValueHandling.Ignore)]
        public T Data { get; set; }

        [JsonProperty(Order = 2, PropertyName = "status")]
        public string Success { get; set; }

        /// <summary>
        /// Represents Http Status code like 200,401
        /// </summary>
        [JsonProperty(Order = 1, PropertyName = "code")]
        public int? code { get; set; }

        [JsonProperty(Order = 3, PropertyName = "message")]
        public string Message { get; set; }

    }

    public class ApiErrorResult<T>
    {
        [JsonProperty(Order = 5, PropertyName = "message", NullValueHandling = NullValueHandling.Ignore)]
        public string Message { get; set; }

        [JsonProperty(Order = 2, PropertyName = "status")]
        public string Status { get; set; }

        /// <summary>
        /// Represents Http Status code like 200,401
        /// </summary>
        [JsonProperty(Order = 1, PropertyName = "code")]
        public int Code { get; set; }

    }
    public class ValidationError
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Field { get; }

        public string Message { get; }

        public ValidationError(string field, string message)
        {
            Field = field != string.Empty ? field : null;
            Message = message;
        }
    }
}
