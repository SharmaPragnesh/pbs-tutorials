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

        [HttpGet]
        [Route("GetUserById")]
        public User GetUserById(long userId)
        {
            var user = _db.User.Where(data => data.UserId == userId).SingleOrDefault();
            return user;
        }

        [HttpPost]
        [Route("UpdateProfile")]
        public int UpdateProfile(User user)
        {
            if (user.UserId == 0)
            {
                bool isUserExist = _db.User.Where(x => x.UserName == user.UserName).FirstOrDefault() == null ? false : true;

                if (!isUserExist)
                {
                    //user.UserName = user.FirstName + user.LastName + DateTime.Now.ToString();
                    user.Password = "abcd";
                    user.IsActive = true;
                    user.UserType = 4;
                    //user.Location = "ahmedabad";
                    //user.ClientId = 1;
                    //user.CreatedBy = 1;
                    //user.CreatedOn = DateTime.Now;
                    //user.UpdatedBy = 1;
                    //user.UpdatedOn = DateTime.Now;
                    _db.User.Add(user);
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
                bool isClientExist = _db.User.Where(x => x.UserName == user.UserName && x.UserId != user.UserId).FirstOrDefault() == null ? false : true;

                if (!isClientExist)
                {
                    var userData = _db.User.Where(data => data.UserId == user.UserId).SingleOrDefault();
                    userData.FirstName = user.FirstName;
                    userData.LastName = user.LastName;
                    //userData.UserName = user.UserName;
                    //userData.IsActive = user.IsActive;
                    //userData.UpdatedBy = 1;
                    //userData.UpdatedOn = DateTime.Now;
                    _db.User.Update(userData);
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
        [Route("ChangeUserStatus")]
        public int ChangeUserStatus(User user)
        {
            var userData = _db.User.Where(data => data.UserId == user.UserId).SingleOrDefault();
            userData.IsActive = user.IsActive;
            _db.User.Update(userData);
            _db.SaveChanges();
            return 1;
        }

        #region Login and Other methods

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(User userModel)
        {
            var userSingle = _db.User.ToList().Where(data => data.UserName == userModel.UserName && 
            data.Password == userModel.Password && data.IsActive == true).SingleOrDefault();

            if (userSingle != null)
            {
                UserInfo singleUser = new UserInfo();
                singleUser.UserId = userSingle.UserId;
                singleUser.FirstName = userSingle.FirstName;
                singleUser.LastName = userSingle.LastName;
                singleUser.UserName = userSingle.UserName;
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

        [HttpPost]
        [Route("ForgotPassword")]
        public int ForgotPassword(User user)
        {
            var userData = _db.User.Where(data => data.UserName == user.UserName && data.IsActive == true).SingleOrDefault();

            if (userData != null)
            {
                return 1;
            }
            return 2;
        }

        [HttpPost]
        [Route("ChangePassword")]
        public int ChangePassword(ChangePassword changePassword)
        {
            var userData = _db.User.Where(data => data.UserId == changePassword.UserId && data.IsActive == true).SingleOrDefault();

            if (userData != null)
            {
                if (userData.Password == changePassword.ExistingPassword)
                {
                    userData.Password = changePassword.Password;
                    _db.User.Update(userData);
                    _db.SaveChanges();
                    return 1;
                }
                else
                {
                    return 2;
                }
            }
            return 2;
        }

        #endregion
    }
}
