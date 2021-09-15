using LearnEntity.Common;
using LearnEntity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ClientController : ControllerBase
	{
		private readonly ApplicationDbContext _db;
		public IConfiguration _configuration { get; }

		public ClientController(ApplicationDbContext db, IConfiguration configuration)
		{
			_db = db;
			_configuration = configuration;
		}

		#region Clients

		[HttpPost]
		[Route("GetClientsSearch")]
		public Page<ClientGrid> GetClientsSearch(ClientParameter clientParameter)
		{
			IQueryable<ClientGrid> query = null;
			Page<ClientGrid> clients = new Page<ClientGrid>();
			//var clientList = _db.Client.ToList();
			int from = 0, size = 0;
			size = clientParameter.PageSize;
			from = (clientParameter.PageStart - 1) * size;

			query = (from cli in _db.Client
						 //where timesheettasks.Active == activeStatus && timesheettasks.ProjectId == prjid
					 select new ClientGrid()
					 {
						 ClientId = cli.ClientId,
						 ClientName = cli.ClientName,
						 ClientCode = cli.ClientCode,
						 ActiveEngagement = _db.Engagements.Where(x => x.ClientID == cli.ClientId).Count(),
						 NewRequests = 0,
						 OverdueRequests = 0,
						 Status = cli.Status,
						 ContactNumber = cli.ContactNumber,
						 EmailId = cli.EmailId,
						 Fax = cli.Fax,
						 ClientIndustryId = cli.ClientIndustryId,
						 CreatedBy = cli.CreatedBy,
						 CreatedOn = cli.CreatedOn,
						 UpdatedBy = cli.UpdatedBy,
						 UpdatedOn = cli.UpdatedOn
					 }).DefaultIfEmpty();


			clients.PageStart = clientParameter.PageStart;
			clients.PageSize = clientParameter.PageSize;

			#region Search

			if (clientParameter.Status != -1)
			{
				int status = int.Parse(clientParameter.Status.Value.ToString());
				query = query.Where(u => u.Status == status);
			}
			if (clientParameter.RecentActivity != -1)
			{
				int recentActivity = int.Parse(clientParameter.RecentActivity.ToString());
				if (recentActivity == 1)
				{
					query = query.Where(u => u.UpdatedOn >= DateTime.Now.AddDays(-5));
				}
				else if (recentActivity == 2)
				{
					query = query.Where(u => u.UpdatedOn >= DateTime.Now.AddDays(-7));
				}
				else
				{
					query = query.Where(u => u.UpdatedOn >= DateTime.Now.AddDays(-30));
				}
			}

			if (!string.IsNullOrEmpty(clientParameter.Search))
			{
				query = query.Where(u => u.ClientName.Contains(clientParameter.Search));
			}

			#endregion

			if (clientParameter.SortColumn == "ClientName")
			{
				query = clientParameter.SortOrder == false ?
						   query.OrderBy(u => u.ClientName) : query.OrderByDescending(u => u.ClientName);
			}
			else if (clientParameter.SortColumn == "ClientCode")
			{
				query = clientParameter.SortOrder == false ?
						   query.OrderBy(u => u.ClientCode) : query.OrderByDescending(u => u.ClientCode);
			}
			else if (clientParameter.SortColumn == "ActiveEngagement")
			{
				query = clientParameter.SortOrder == false ?
						   query.OrderBy(u => u.ActiveEngagement) : query.OrderByDescending(u => u.ActiveEngagement);
			}
			else if (clientParameter.SortColumn == "UpdatedOn")
			{
				query = clientParameter.SortOrder == false ?
						   query.OrderBy(u => u.UpdatedOn) : query.OrderByDescending(u => u.UpdatedOn);
			}


			List<ClientGrid> listTemp = query.ToList();
			clients.TotalCount = listTemp != null ? listTemp.Count : 0;
			//clients.TotalCount = query.Count(); //Stop because some issue in code



			if (size != -1)
				query = query.Skip(from).Take(size);

			clients.List = query.ToList();
			return clients;
		}


		[HttpGet]
		[Route("GetClients")]
		public IEnumerable<Client> GetClients()
		{
			var clientList = _db.Client.Where(data => data.Status == 1).ToList();
			return clientList;
		}


		[HttpGet]
		[Route("GetClientById")]
		public Client GetClientById(long clientId)
		{
			var client = _db.Client.Where(data => data.ClientId == clientId).SingleOrDefault();
			return client;
		}


		[HttpPost]
		[Route("SaveClient")]
		public int SaveClient(Client client)
		{
			if (client.ClientId == 0)
			{
				bool isClientExist = _db.Client.Where(x => x.ClientName == client.ClientName).FirstOrDefault() == null ? false : true;

				if (!isClientExist)
				{
					client.Status = 1;
					client.CreatedBy = 1;
					client.CreatedOn = DateTime.Now;
					client.UpdatedBy = 1;
					client.UpdatedOn = DateTime.Now;
					_db.Client.Add(client);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
			}
			else
			{
				bool isClientExist = _db.Client.Where(x => x.ClientName == client.ClientName && x.ClientId != client.ClientId).FirstOrDefault() == null ? false : true;

				if (!isClientExist)
				{
					var clientData = _db.Client.Where(data => data.ClientId == client.ClientId).SingleOrDefault();
					clientData.ClientName = client.ClientName;
					clientData.ClientCode = client.ClientCode;
					clientData.Status = client.Status;
					clientData.ContactNumber = client.ContactNumber;
					clientData.EmailId = client.EmailId;
					clientData.Fax = client.Fax;
					clientData.ClientIndustryId = client.ClientIndustryId;
					clientData.UpdatedBy = 1;
					clientData.UpdatedOn = DateTime.Now;
					_db.Client.Update(clientData);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
			}
		}

		[HttpPost]
		[Route("SaveClientNew")]
		public int SaveClientNew(Client client)
		{
			if (client.ClientId == 0)
			{
				bool isClientExist = _db.Client.Where(x => x.ClientName == client.ClientName).FirstOrDefault() == null ? false : true;

				if (!isClientExist)
				{
					client.Status = 1;
					client.CreatedBy = 1;
					client.CreatedOn = DateTime.Now;
					client.UpdatedBy = 1;
					client.UpdatedOn = DateTime.Now;
					_db.Client.Add(client);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
			}
			else
			{
				bool isClientExist = _db.Client.Where(x => x.ClientName == client.ClientName && x.ClientId != client.ClientId).FirstOrDefault() == null ? false : true;

				if (!isClientExist)
				{
					var clientData = _db.Client.Where(data => data.ClientId == client.ClientId).SingleOrDefault();
					clientData.ClientName = client.ClientName;
					clientData.ClientCode = client.ClientCode;
					clientData.Status = client.Status;
					clientData.ContactNumber = client.ContactNumber;
					clientData.EmailId = client.EmailId;
					clientData.Fax = client.Fax;
					clientData.ClientIndustryId = client.ClientIndustryId;
					clientData.UpdatedBy = 1;
					clientData.UpdatedOn = DateTime.Now;
					_db.Client.Update(clientData);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
			}
		}

		[HttpPost]
		[Route("UploadFile")]
		public async Task<IActionResult> UploadFile(IFormCollection data, IFormFile file)
		{
			try
			{
				string NewFileName = "";
				if (data["name"].Count > 0)
				{
					if (Convert.ToString(data["clientId"]) == "0")
						NewFileName = Convert.ToString(data["name"]);
					else
						NewFileName = Convert.ToString(data["clientId"]);
				}
				/////////////////////
				var uploads = Path.Combine(Directory.GetCurrentDirectory()) + "\\" + "Images";
				if (!Directory.Exists(uploads))
				{
					Directory.CreateDirectory(uploads);
				}
				int uploadFileLength = file.FileName.Split(".").Length;
				if (file.Length > 0)
				{
					var filePath = uploads;
					if (uploadFileLength > 1)
					{
						filePath = Path.Combine(uploads, NewFileName + "." + file.FileName.Split(".")[uploadFileLength - 1]);
					}

					using (var fileStream = new FileStream(filePath, FileMode.Create))
					{
						await file.CopyToAsync(fileStream);
					}

					//
					if (Convert.ToString(data["clientId"]) != "0")
					{
						int clientId = Int32.Parse(Convert.ToString(data["clientId"]));
						var clientData = _db.Client.Where(data => data.ClientId == clientId).SingleOrDefault();
						clientData.FilePath = NewFileName + "." + file.FileName.Split(".")[uploadFileLength - 1];
						//clientData.UpdatedBy = 1;
						//clientData.UpdatedOn = DateTime.Now;
						_db.Client.Update(clientData);
						_db.SaveChanges();
					}
					//
					if (true) //if (AVScanerVirusExists(filePath))
					{
						return Ok(false);
					}
				}
				return Ok(true);
			}
			catch (Exception ex)
			{
				//_logger.LogError("Error in upload : {0}", ex.Message);
				//_logger.LogError("Error in upload : {0}", ex.StackTrace);
				return Ok(new { error = Convert.ToString(ex) });
			}
		}

		#endregion

		#region Client Industry

		[HttpGet]
		[Route("GetClientIndustries")]
		public IEnumerable<ClientIndustry> GetClientIndustries()
		{
			var clientIndustryList = _db.ClientIndustry.ToList();
			return clientIndustryList;
		}

		#endregion

		[HttpGet]
		[Route("GetServiceIndustries")]
		public IEnumerable<ServiceIndustries> GetServiceIndustries()
		{
			var serviceIndustriesList = _db.ServiceIndustries.Where(data => data.IsActive == true).ToList();
			return serviceIndustriesList;
		}

		[HttpPost]
		[Route("SaveServiceIndustries")]
		public int SaveServiceIndustries(ServiceIndustries serviceIndustries)
		{
			if (serviceIndustries.ServiceIndustryID == 0)
			{
				bool isServiceIndustriesExist = _db.ServiceIndustries.Where(x => x.ServiceIndustryName == serviceIndustries.ServiceIndustryName).FirstOrDefault() == null ? false : true;

				if (!isServiceIndustriesExist)
				{
					serviceIndustries.IsActive = true;
					//serviceIndustries.AddedBy = 1;
					serviceIndustries.DateAdded = DateTime.Now;
					//serviceIndustries.ModifiedBy = 1;
					serviceIndustries.DateModified = DateTime.Now;
					_db.ServiceIndustries.Add(serviceIndustries);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
			}
			else
			{
				bool isServiceIndustriesExist = _db.ServiceIndustries.Where(x => x.ServiceIndustryName == serviceIndustries.ServiceIndustryName && x.ServiceIndustryID != serviceIndustries.ServiceIndustryID).FirstOrDefault() == null ? false : true;

				if (!isServiceIndustriesExist)
				{
					var serviceIndustriesData = _db.ServiceIndustries.Where(data => data.ServiceIndustryID == serviceIndustries.ServiceIndustryID).SingleOrDefault();
					serviceIndustriesData.ServiceIndustryName = serviceIndustries.ServiceIndustryName;
					serviceIndustriesData.ServiceIndustryDescription = serviceIndustries.ServiceIndustryDescription;
					serviceIndustriesData.ModifiedBy = serviceIndustries.ModifiedBy;
					serviceIndustriesData.DateModified = DateTime.Now;
					_db.ServiceIndustries.Update(serviceIndustriesData);
					_db.SaveChanges();
					return 1;
				}
				else
				{
					return 2;
				}
			}
		}


		[HttpGet]
		[Route("DeleteServiceIndustry")]
		public int DeleteServiceIndustry(int serviceIndustryID)
		{
			var serviceIndustriesData = _db.ServiceIndustries.Where(data => data.ServiceIndustryID == serviceIndustryID).SingleOrDefault();
			if (serviceIndustriesData != null)
			{
				serviceIndustriesData.IsActive = false;
				serviceIndustriesData.ModifiedBy = 101;
				serviceIndustriesData.DateModified = DateTime.Now;
				_db.ServiceIndustries.Update(serviceIndustriesData);
				_db.SaveChanges();
				return 1;
			}
			else
			{
				return 0;
			}
		}
	}
}
