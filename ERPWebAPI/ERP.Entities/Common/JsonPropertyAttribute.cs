using System;

namespace ERP.Entities.Common
{
    internal class JsonPropertyAttribute : Attribute
    {
        public string PropertyName { get; set; }
    }
}