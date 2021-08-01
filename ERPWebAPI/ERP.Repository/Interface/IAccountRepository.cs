using ERP.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Repository.Interface
{
    public interface IAccountRepository
    {
        Task<Resources> GetUserDetails(string email);
    }
}
