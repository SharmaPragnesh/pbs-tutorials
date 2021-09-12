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
        public Page<EngagementsGrid> GetEngagements(EngagementsParameter clientParameter)
        {
            IQueryable<EngagementsGrid> query = null;
            Page<EngagementsGrid> clients = new Page<EngagementsGrid>();
            //var clientList = _db.Client.ToList();
            int from = 0, size = 0;
            size = clientParameter.PageSize;
            from = (clientParameter.PageStart - 1) * size;

            query = (from cli in _db.Engagements
                         //where timesheettasks.Active == activeStatus && timesheettasks.ProjectId == prjid
                     select new EngagementsGrid()
                     {
                         EngagementID = cli.EngagementID,
                         ClientID = cli.ClientID,
                         EngagementName = cli.EngagementName,
                         EngagementCode = cli.EngagementCode,
                         DateModified = cli.DateModified,
                         NewRequests = _db.Request.Where(x => x.EngagementID == cli.EngagementID && x.Status == 1).Count(),
                         Completed = _db.Request.Where(x => x.EngagementID == cli.EngagementID && x.Status == 4).Count(),
                         Approved = _db.Request.Where(x => x.EngagementID == cli.EngagementID && x.Status == 5).Count(),
                         Overdue = _db.Request.Where(x => x.EngagementID == cli.EngagementID && x.Status == 7).Count()
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


            List<EngagementsGrid> listTemp = query.ToList();
            clients.TotalCount = listTemp != null ? listTemp.Count : 0;
            //clients.TotalCount = query.Count(); //Stop because some issue in code

            if (size != -1)
                query = query.Skip(from).Take(size);

            clients.List = query.ToList();
            return clients;
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
                    engagementsData.DateModified = DateTime.Now;
                    engagementsData.ModifiedBy = 3;
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

        [HttpPost]
        [Route("GetRequests")]
        public EnagementDetails GetRequests(RequestParameter requestParameter)
        {
            var engagements = _db.Engagements.Where(data => data.EngagementID == requestParameter.EngagementID).SingleOrDefault();
            var client = _db.Client.Where(data => data.ClientId == engagements.ClientID).SingleOrDefault();

            EnagementDetails enagementDetails = new EnagementDetails();
            enagementDetails.ClientID = engagements.ClientID;
            enagementDetails.ClientName = client.ClientName;
            enagementDetails.ClientCode = client.ClientCode;
            enagementDetails.EngagementID = engagements.EngagementID;
            enagementDetails.EngagementName = engagements.EngagementName;
            enagementDetails.EngagementCode = engagements.EngagementCode;

            RequestHeaderStatus requestHeaderStatus = new RequestHeaderStatus();
            requestHeaderStatus.Total = _db.Request.Where(data => data.EngagementID == requestParameter.EngagementID).Count();
            requestHeaderStatus.New = _db.Request.Where(data => data.EngagementID == requestParameter.EngagementID && data.Status == 1).Count();
            requestHeaderStatus.Completed = _db.Request.Where(data => data.EngagementID == requestParameter.EngagementID && data.Status == 4).Count();
            requestHeaderStatus.Approved = _db.Request.Where(data => data.EngagementID == requestParameter.EngagementID && data.Status == 5).Count();
            requestHeaderStatus.Overdue = _db.Request.Where(data => data.EngagementID == requestParameter.EngagementID && data.Status == 7).Count();
            enagementDetails.RequestHeaderStatus = requestHeaderStatus;

            IQueryable<RequestByGroup> query1 = null;

            query1 = (from cli in _db.Request
                      where cli.EngagementID == requestParameter.EngagementID
                      select new RequestByGroup()
                      {
                          GroupID = cli.GroupID,
                          GroupName = _db.Group.Where(x => x.GroupID == cli.GroupID).Select(x => x.GroupName).FirstOrDefault(),
                          RequestCount = _db.Request.Where(x => x.EngagementID == requestParameter.EngagementID && x.GroupID == cli.GroupID).Count()
                      }).Distinct();

            enagementDetails.RequestByGroup = query1.ToList();

            IQueryable<RequestGrid> query = null;
            Page<RequestGrid> clients = new Page<RequestGrid>();
            int from = 0, size = 0;
            size = requestParameter.PageSize;
            from = (requestParameter.PageStart - 1) * size;

            query = (from cli in _db.Request
                         //where timesheettasks.Active == activeStatus && timesheettasks.ProjectId == prjid
                     select new RequestGrid()
                     {
                         RequestID = cli.RequestID,
                         RequestName = cli.RequestName,
                         EngagementID = cli.EngagementID,
                         GroupName = _db.Group.Where(x => x.GroupID == cli.GroupID).Select(x => x.GroupName).FirstOrDefault(),
                         GroupID = cli.GroupID,
                         Status = cli.Status,
                         StatusName = _db.RequestStatus.Where(x => x.RequestStatusID == cli.Status).Select(x => x.RequestStatusName).FirstOrDefault(),
                         Description = cli.Description,
                     }).DefaultIfEmpty();


            clients.PageStart = requestParameter.PageStart;
            clients.PageSize = requestParameter.PageSize;

            #region Search

            //if (clientParameter.Status != -1)
            //{
            //	int status = int.Parse(clientParameter.Status.Value.ToString());
            //	query = query.Where(u => u.Status == status);
            //}
            if (!string.IsNullOrEmpty(requestParameter.Search))
            {
                query = query.Where(u => u.RequestName.Contains(requestParameter.Search));
            }
            if (requestParameter.EngagementID != 0)
            {
                query = query.Where(u => u.EngagementID == requestParameter.EngagementID);
            }

            #endregion

            if (requestParameter.SortColumn == "RequestName")
            {
                query = requestParameter.SortOrder == false ?
                           query.OrderBy(u => u.RequestName) : query.OrderByDescending(u => u.RequestName);
            }
            else if (requestParameter.SortColumn == "GroupName")
            {
                query = requestParameter.SortOrder == false ?
                           query.OrderBy(u => u.GroupName) : query.OrderByDescending(u => u.GroupName);
            }
            //else if (requestParameter.SortColumn == "DateModified")
            //{
            //    query = requestParameter.SortOrder == false ?
            //               query.OrderBy(u => u.DateModified) : query.OrderByDescending(u => u.DateModified);
            //}

            List<RequestGrid> listTemp = query.ToList();
            clients.TotalCount = listTemp != null ? listTemp.Count : 0;
            //clients.TotalCount = query.Count(); //Stop because some issue in code

            if (size != -1)
                query = query.Skip(from).Take(size);

            clients.List = query.ToList();
            enagementDetails.RequestList = clients;
            return enagementDetails;
        }

        [HttpPost]
        [Route("GetRequestsByGroupId")]
        public Page<RequestGrid> GetRequestsByGroupId(RequestGroupParameter requestParameter)
        {
            IQueryable<RequestGrid> query = null;
            Page<RequestGrid> clients = new Page<RequestGrid>();
            int from = 0, size = 0;
            size = requestParameter.PageSize;
            from = (requestParameter.PageStart - 1) * size;

            query = (from cli in _db.Request
                         where cli.EngagementID == requestParameter.EngagementID && cli.GroupID == requestParameter.GroupID
                     select new RequestGrid()
                     {
                         RequestID = cli.RequestID,
                         RequestName = cli.RequestName,
                         EngagementID = cli.EngagementID,
                         GroupName = _db.Group.Where(x => x.GroupID == cli.GroupID).Select(x => x.GroupName).FirstOrDefault(),
                         GroupID = cli.GroupID,
                         Status = cli.Status,
                         StatusName = _db.RequestStatus.Where(x => x.RequestStatusID == cli.Status).Select(x => x.RequestStatusName).FirstOrDefault(),
                         Description = cli.Description,
                     }).DefaultIfEmpty();


            clients.PageStart = requestParameter.PageStart;
            clients.PageSize = requestParameter.PageSize;

            #region Search

            //if (clientParameter.Status != -1)
            //{
            //	int status = int.Parse(clientParameter.Status.Value.ToString());
            //	query = query.Where(u => u.Status == status);
            //}
            if (!string.IsNullOrEmpty(requestParameter.Search))
            {
                query = query.Where(u => u.RequestName.Contains(requestParameter.Search));
            }
            if (requestParameter.EngagementID != 0)
            {
                query = query.Where(u => u.EngagementID == requestParameter.EngagementID);
            }

            #endregion

            if (requestParameter.SortColumn == "RequestName")
            {
                query = requestParameter.SortOrder == false ?
                           query.OrderBy(u => u.RequestName) : query.OrderByDescending(u => u.RequestName);
            }
            else if (requestParameter.SortColumn == "GroupName")
            {
                query = requestParameter.SortOrder == false ?
                           query.OrderBy(u => u.GroupName) : query.OrderByDescending(u => u.GroupName);
            }
            

            List<RequestGrid> listTemp = query.ToList();
            clients.TotalCount = listTemp != null ? listTemp.Count : 0;

            if (size != -1)
                query = query.Skip(from).Take(size);

            clients.List = query.ToList();
            return clients;
        }

        [HttpGet]
        [Route("GetRequestsByID")]
        public Request GetRequestsByID(int RequestID)
        {
            var request = _db.Request.Where(data => data.RequestID == RequestID).SingleOrDefault();
            return request;
        }

        [HttpPost]
        [Route("AddRequest")]
        public int AddRequest(Request request)
        {
            bool isRequestExist = _db.Request.Where(x => x.RequestName == request.RequestName).Count() == 0 ? false : true;

            if (!isRequestExist)
            {
                var requestData = _db.Request.Where(data => data.RequestID == request.RequestID).SingleOrDefault();
                request.RequestName = request.RequestName;
                request.EngagementID = request.EngagementID;
                request.GroupID = request.GroupID;
                request.Description = request.Description;
                request.Status = 1; //request.Status;
                request.DateAdded = DateTime.Now;
                request.AddedBy = 3;
                request.DateModified = DateTime.Now;
                request.ModifiedBy = 3;
                _db.Request.Add(request);
                _db.SaveChanges();
                return 1;
            }
            else
            {
                return 2;
            }
        }


        [HttpPost]
        [Route("EditRequest")]
        public int EditRequest(Request request)
        {
            bool isRequestExist = _db.Request.Where(x => x.RequestName == request.RequestName && x.RequestID != request.RequestID).FirstOrDefault() == null ? false : true;

            if (!isRequestExist)
            {
                var requestData = _db.Request.Where(data => data.RequestID == request.RequestID).SingleOrDefault();
                requestData.RequestName = request.RequestName;
                requestData.Description = request.Description;
                requestData.DateModified = DateTime.Now;
                requestData.ModifiedBy = 3;
                _db.Request.Update(requestData);
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
