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
						 EngagementCode = cli.EngagementCode
					 }).DefaultIfEmpty();


			clients.PageStart = clientParameter.PageStart;
			clients.PageSize = clientParameter.PageSize;

			#region Search

			//if (clientParameter.Status != -1)
			//{
			//	int status = int.Parse(clientParameter.Status.Value.ToString());
			//	query = query.Where(u => u.Status == status);
			//}
			if (clientParameter.ClientID != 0)
			{
				query = query.Where(u => u.ClientID == clientParameter.ClientID);
			}

			#endregion

			//if (clientParameter.SortColumn == "ClientName")
			//{
			//	query = clientParameter.SortOrder == false ?
			//			   query.OrderBy(u => u.ClientName) : query.OrderByDescending(u => u.ClientName);
			//}
			//else if (clientParameter.SortColumn == "ClientCode")
			//{
			//	query = clientParameter.SortOrder == false ?
			//			   query.OrderBy(u => u.ClientCode) : query.OrderByDescending(u => u.ClientCode);
			//}
			//else if (clientParameter.SortColumn == "UpdatedOn")
			//{
			//	query = clientParameter.SortOrder == false ?
			//			   query.OrderBy(u => u.UpdatedOn) : query.OrderByDescending(u => u.UpdatedOn);
			//}


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
	}
}
