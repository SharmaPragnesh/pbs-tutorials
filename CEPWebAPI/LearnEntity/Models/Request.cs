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
		public DateTime DateAdded { get; set; }
		public int AddedBy { get; set; }
		public DateTime DateModified { get; set; }
		public int ModifiedBy { get; set; }
	}

	public class RequestGrid : Request
	{
		public string GroupName { get; set; }
		public string StatusName { get; set; }
	}

	public class RequestByGroup : Request
	{
		public string GroupName { get; set; }
		public int RequestCount { get; set; }
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

	public class RequestGroupParameter
	{
		public int PageSize { get; set; }
		public int PageStart { get; set; }
		public bool SortOrder { get; set; }
		public string SortColumn { get; set; }
		public int? Status { get; set; }
		public string Search { get; set; }
		public int EngagementID { get; set; }
		public int GroupID { get; set; }
	}

	public class RequestStatus
	{
		[Key]
		public int RequestStatusID { get; set; }
		public string RequestStatusName { get; set; }
		public DateTime DateAdded { get; set; }
		public int AddedBy { get; set; }
		public DateTime DateModified { get; set; }
		public int ModifiedBy { get; set; }
	}

	public class RequestHeaderStatus
	{
		public int Total { get; set; }
		public int New { get; set; }
		public int Completed { get; set; }
		public int Approved { get; set; }
		public int Overdue { get; set; }
	}
}
