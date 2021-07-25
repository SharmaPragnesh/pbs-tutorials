using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Entities.Roles
{
    public class PageParameter
    {
        public string Search { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public byte PageStart { get; set; }
        public byte PageSize { get; set; }
    }
}
