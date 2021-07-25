using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Extension;
using ERP.Entities.Roles;
using ERP.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERPWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRolesRepository _repository;

        public RolesController(IRolesRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        //[HttpGet]
        //public async Task<IEnumerable<RolesResponse>> GetAsync()
        //{
        //    return await _repository.GetRoles();
        //}

        [HttpPost]
        public async Task<Page<RolesResponse>> GetAsync(PageParameter pageParameter)
        {
            return await _repository.GetRoles(pageParameter);
        }
    }
}
