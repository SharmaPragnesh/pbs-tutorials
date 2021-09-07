using LearnEntity.Common;
using LearnEntity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class EngagementController : ControllerBase
	{
		private readonly ApplicationDbContext _db;

		public EngagementController(ApplicationDbContext db)
		{
			_db = db;
		}

		[HttpPost]
		[Route("GetEngagements")]
		public Page<Engagements> GetEngagements(EngagementsParameter clientParameter)
		{
			IQueryable<Engagements> query = null;
			Page<Engagements> clients = new Page<Engagements>();
			//var clientList = _db.Client.ToList();
			int from = 0, size = 0;
			size = clientParameter.PageSize;
			from = (clientParameter.PageStart - 1) * size;

			query = (from cli in _db.Engagements
						 //where timesheettasks.Active == activeStatus && timesheettasks.ProjectId == prjid
					 select new Engagements()
					 {
						 EngagementID = cli.EngagementID,
						 ClientID = cli.ClientID,
						 EngagementName = cli.EngagementName,
						 EngagementCode = cli.EngagementCode,
						 DateModified = cli.DateModified
					 }).DefaultIfEmpty();


			clients.PageStart = clientParameter.PageStart;
			clients.PageSize = clientParameter.PageSize;

			#region Search

			//if (clientParameter.Status != -1)
			//{
			//	int status = int.Parse(clientParameter.Status.Value.ToString());
			//	query = query.Where(u => u.Status == status);
			//}
			if (!string.IsNullOrEmpty(clientParameter.Search))
			{
				query = query.Where(u => u.EngagementName.Contains(clientParameter.Search));
			}
			if (clientParameter.ClientID != 0)
			{
				query = query.Where(u => u.ClientID == clientParameter.ClientID);
			}

			#endregion

			if (clientParameter.SortColumn == "EngagementName")
			{
				query = clientParameter.SortOrder == false ?
						   query.OrderBy(u => u.EngagementName) : query.OrderByDescending(u => u.EngagementName);
			}
			else if (clientParameter.SortColumn == "EngagementCode")
			{
				query = clientParameter.SortOrder == false ?
						   query.OrderBy(u => u.EngagementCode) : query.OrderByDescending(u => u.EngagementCode);
			}
			else if (clientParameter.SortColumn == "DateModified")
			{
				query = clientParameter.SortOrder == false ?
						   query.OrderBy(u => u.DateModified) : query.OrderByDescending(u => u.DateModified);
			}

			List<Engagements> listTemp = query.ToList();
			clients.TotalCount = listTemp != null ? listTemp.Count : 0;
			//clients.TotalCount = query.Count(); //Stop because some issue in code

			if (size != -1)
				query = query.Skip(from).Take(size);

			clients.List = query.ToList();
			return clients;

			//         if(clientID == 0)
			//{
			//             var engagement = _db.Engagements.ToList();
			//             return engagement;
			//         }
			//         else
			//{
			//             var engagement = _db.Engagements.Where(data => data.ClientID == clientID).ToList();
			//             return engagement;
			//         }
		}


		[HttpGet]
		[Route("GetEngagementsByID")]
		public Engagements GetEngagementsByID(long EngagementID)
		{
			var engagements = _db.Engagements.Where(data => data.EngagementID == EngagementID).SingleOrDefault();
			return engagements;
		}


		[HttpPost]
		[Route("SaveEngagements")]
		public int SaveEngagements(Engagements engagements)
		{
			if (engagements.EngagementID == 0)
			{
				bool isEngagementsExist = _db.Engagements.Where(x => x.EngagementName == engagements.EngagementName).FirstOrDefault() == null ? false : true;

				if (!isEngagementsExist)
				{
					engagements.EngagementName = engagements.EngagementName;
					engagements.EngagementCode = engagements.EngagementCode;
					engagements.ClientID = engagements.ClientID;
					engagements.StartDate = engagements.StartDate;
					engagements.EndDate = engagements.EndDate;
					//Temp Hardcoded
					engagements.EngagementStatusID = 2;
					engagements.ServiceLineID = 2;
					engagements.RecordStatusID = 1;
					engagements.DateAdded = DateTime.Now;
					engagements.AddedBy = 3;
					engagements.DateModified = DateTime.Now;
					engagements.ModifiedBy = 3;
					_db.Engagements.Add(engagements);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
				return 2;
			}
			else
			{
				bool isEngagementsExist = _db.Engagements.Where(x => x.EngagementName == engagements.EngagementName && x.EngagementID != engagements.EngagementID).FirstOrDefault() == null ? false : true;

				if (!isEngagementsExist)
				{
					var engagementsData = _db.Engagements.Where(data => data.EngagementID == engagements.EngagementID).SingleOrDefault();
					engagementsData.EngagementName = engagements.EngagementName;
					engagementsData.EngagementCode = engagements.EngagementCode;
					engagementsData.ClientID = engagements.ClientID;
					engagementsData.StartDate = engagements.StartDate;
					engagementsData.EndDate = engagements.EndDate;
					//clientData.Status = engagements.Status;
					//clientData.ContactNumber = engagements.ContactNumber;
					//clientData.EmailId = engagements.EmailId;
					//clientData.Fax = engagements.Fax;
					//clientData.ClientIndustryId = engagements.ClientIndustryId;
					//clientData.UpdatedBy = 1;
					//clientData.date = DateTime.Now;
					_db.Engagements.Update(engagementsData);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
			}
		}
	}
}
