using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Models
{
    public class Engagements
    {
        [Key]
        public int EngagementID { get; set; }
        public int ClientID { get; set; }
        public string EngagementName { get; set; }
        public string EngagementCode { get; set; }
        //public int Status { get; set; }
        //public string ContactNumber { get; set; }
        //public string Fax { get; set; }
        //public string EmailId { get; set; }
        //public long ClientIndustryId { get; set; }
        //public long CreatedBy { get; set; }
        //public DateTime CreatedOn { get; set; }
        //public long UpdatedBy { get; set; }
        //public DateTime UpdatedOn { get; set; }
    }

    public class EngagementsParameter
    {
        public int PageSize { get; set; }
        public int PageStart { get; set; }
        public bool SortOrder { get; set; }
        public string SortColumn { get; set; }
        public int? Status { get; set; }
        //public string Search { get; set; }
        public int ClientID { get; set; }
    }
}
