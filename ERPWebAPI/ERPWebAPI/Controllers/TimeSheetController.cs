using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP.Entities.Common;
using ERP.Entities.TimeSheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERPWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        [HttpGet]
        public async Task<TimeSheetModel> GetAsync()
        {
            TimeSheetModel obj = new TimeSheetModel();
            obj.ProjectList = ProjectList();
            obj.ResourceList = ResourceList();
            return obj;
            //test on production branch
        }

        public List<LookUpResponse> ProjectList()
        {
            List<LookUpResponse> lst = new List<LookUpResponse>();
            lst.Add(new LookUpResponse() { Id = 1, DisplayText = "Cooks Plumbing", DisplayValue = "AAAAA", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 2, DisplayText = "AirBase", DisplayValue = "BBBB", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 3, DisplayText = "Aricraft", DisplayValue = "CCCC", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 4, DisplayText = "ECL-EKM", DisplayValue = "DDDD", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 5, DisplayText = "Health Data Integration", DisplayValue = "EEEE", IsDefault = true });
            return lst;
        }

        public List<LookUpResponse> ResourceList()
        {
            List<LookUpResponse> lst = new List<LookUpResponse>();
            lst.Add(new LookUpResponse() { Id = 1, DisplayText = "Mikunj Rathwa", DisplayValue = "AA", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 2, DisplayText = "Richa Khatri", DisplayValue = "BB", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 3, DisplayText = "Bhavini Sharma", DisplayValue = "CC", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 4, DisplayText = "Preet Joshi", DisplayValue = "DD", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 5, DisplayText = "Neha Pandya", DisplayValue = "EE", IsDefault = true });
            return lst;
        }
    }
}
