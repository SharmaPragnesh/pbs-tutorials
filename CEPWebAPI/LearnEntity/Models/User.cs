using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        //public string Email { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public int UserType { get; set; }
        public string Location { get; set; }
        public int ClientId { get; set; }
    }

    public class UserInfo
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        //public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public bool IsActive { get; set; }
        public int UserType { get; set; }
    }

    public class ChangePassword
    {
        public int UserId { get; set; }
        public string ExistingPassword { get; set; }
        public string Password { get; set; }
    }

    public class UserParameter
    {
        public int PageSize { get; set; }
        public int PageStart { get; set; }
        public bool SortOrder { get; set; }
        public string SortColumn { get; set; }
        public int? Status { get; set; }
        public string Search { get; set; }
    }
}
