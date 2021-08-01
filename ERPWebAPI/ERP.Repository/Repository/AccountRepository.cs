using ERP.Entities;
using ERP.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Repository.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly string _connectionString = "Data Source=erptrainee.database.windows.net;Initial Catalog=ERPTrainees_DEV;User ID=erpadmin;password=psspl@12345;";

        public AccountRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Resources> GetUserDetails(string email)
        {
            Resources resources = new Resources();
            var data = _dbContext.Resources.Where(r => r.Email == email).Select(s => new Resources()
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                RoleId = s.RoleId,
                RoleName = _dbContext.Roles.Where(r => r.Id == s.RoleId).Select(l => l.Name).FirstOrDefault(),
                Designation = s.Designation,
                Active = s.Active
            }).FirstOrDefault();
            return data;
        }
    }
}
