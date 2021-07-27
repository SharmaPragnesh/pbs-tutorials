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

        //[Authorize]
        [HttpPost]
        [Route("InsertUpdateRoles")]
        public async Task InsertUpdateRoles([FromBody] RolesResponse rolesResponse)
        {
            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserId").Value;
                rolesResponse.CreatedBy = 96;
                //rolesResponse.UserId = Convert.ToInt32(userId);
                if (rolesResponse.Id == 0)
                {
                    await _repository.InsertRoles(rolesResponse);
                }
                else
                {
                    await _repository.UpdateRoles(rolesResponse);
                }
            }
            catch (Exception ex)
            {
                //_logger.LogError("Error in InsertUpdateRoles : {0}", ex.Message);
                //_logger.LogError("Error in InsertUpdateRoles : {0}", ex.StackTrace);
                throw new Exception(Convert.ToString(ex));
            }
        }
    }
}
