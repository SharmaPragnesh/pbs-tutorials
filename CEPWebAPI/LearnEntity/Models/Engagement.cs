using LearnEntity.Common;
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
		public int EngagementStatusID { get; set; }
		public int ServiceLineID { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public int RecordStatusID { get; set; }
		public DateTime DateAdded { get; set; }
		public int AddedBy { get; set; }
		public DateTime DateModified { get; set; }
		public int ModifiedBy { get; set; }
	}

	public class EngagementsGrid : Engagements
	{
		public int NewRequests { get; set; }
		public int Completed { get; set; }
		public int Approved { get; set; }
		public int Overdue { get; set; }
	}

	public class EngagementsParameter
	{
		public int PageSize { get; set; }
		public int PageStart { get; set; }
		public bool SortOrder { get; set; }
		public string SortColumn { get; set; }
		public int? Status { get; set; }
		public string Search { get; set; }
		public int ClientID { get; set; }
	}

	public class EnagementDetails
	{
		public int ClientID { get; set; }
		public string ClientCode { get; set; }
		public string ClientName { get; set; }
		public int EngagementID { get; set; }
		public string EngagementName { get; set; }
		public string EngagementCode { get; set; }
		public RequestHeaderStatus RequestHeaderStatus { get; set; }
		public Page<RequestGrid> RequestList { get; set; }
		public List<RequestByGroup> RequestByGroup { get; set; }
	}
}
