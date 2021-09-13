using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Models
{
    public class Client
    {
        [Key]
        public long ClientId { get; set; }
        public string ClientName { get; set; }
        public string ClientCode { get; set; }
        public string FilePath { get; set; }
        public int Status { get; set; }
        public string ContactNumber { get; set; }
        public string Fax { get; set; }
        public string EmailId { get; set; }
        public long ClientIndustryId { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }

    public class ClientGrid : Client
    {
        public int ActiveEngagement { get; set; }
        public int NewRequests { get; set; }
        public int OverdueRequests { get; set; }
    }

        public class ClientIndustry
    {
        [Key]
        public long ClientIndustryId { get; set; }
        public string ClientIndustryName { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }

    public class ClientParameter
    {
        public int PageSize { get; set; }
        public int PageStart { get; set; }
        public bool SortOrder { get; set; }
        public string SortColumn { get; set; }
        public int? Status { get; set; }
        public int? RecentActivity { get; set; }
        public string Search { get; set; }
    }

    public class ServiceIndustries
	{
        [Key]
        public int ServiceIndustryID { get; set; }
        public string ServiceIndustryCode { get; set; }
        public string ServiceIndustryName { get; set; }
        public string ServiceIndustryDescription { get; set; }
        public bool IsActive { get; set; }
        /////
        public DateTime DateAdded { get; set; }
        public int AddedBy { get; set; }
        public DateTime DateModified { get; set; }
        public int ModifiedBy { get; set; }
    }
}
