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
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public UserController(ApplicationDbContext db)
        {
            _db = db;
        }


        [HttpGet]
        [Route("GetUser")]
        public IEnumerable<User> GetUser()
        {
            var userList = _db.User.ToList();
            return userList;
        }

        #region Login and Other methods

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(User userModel)
        {
            var userSingle = _db.User.ToList().Where(data => data.UserName == userModel.UserName && data.Password == userModel.Password).SingleOrDefault();
            
            if(userSingle != null)
            {
                UserInfo singleUser = new UserInfo();
                singleUser.UserId = userSingle.UserId;
                singleUser.FirstName = userSingle.FirstName;
                singleUser.LastName = userSingle.LastName;
                singleUser.Password = userSingle.Password;
                singleUser.Token = "ABCDEFG";
                singleUser.IsActive = userSingle.IsActive;
                singleUser.UserType = userSingle.UserType;
                return Ok(new { singleUser });
            }
            else
                return BadRequest(new { message = "IncorrectPassword" });

            //return Ok(new { userList });
        }

        #endregion
    }
}
