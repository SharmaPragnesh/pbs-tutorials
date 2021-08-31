using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Models
{
    public class Engagement
    {
        [Key]
        public long EngagementId { get; set; }
        public long ClientId { get; set; }
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
}
