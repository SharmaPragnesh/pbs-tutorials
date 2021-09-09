using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Models
{
	public class Request
	{
		[Key]
		public int RequestID { get; set; }
		public string RequestName { get; set; }
		public int EngagementID { get; set; }
		public int GroupID { get; set; }
		public string Description { get; set; }
		public int Status { get; set; }
		public long CreatedBy { get; set; }
		public DateTime CreatedOn { get; set; }
		public long UpdatedBy { get; set; }
		public DateTime UpdatedOn { get; set; }
	}

	public class RequestGrid : Request
	{
		public string GroupName { get; set; }
	}

	public class RequestParameter
	{
		public int PageSize { get; set; }
		public int PageStart { get; set; }
		public bool SortOrder { get; set; }
		public string SortColumn { get; set; }
		public int? Status { get; set; }
		public string Search { get; set; }
		public int EngagementID { get; set; }
	}
}
