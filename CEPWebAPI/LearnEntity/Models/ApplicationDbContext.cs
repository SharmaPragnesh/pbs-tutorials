using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LearnEntity.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Client> Client { get; set; }
        public DbSet<ClientIndustry> ClientIndustry { get; set; }
        public DbSet<Engagements> Engagements { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<Request> Request { get; set; }
        public DbSet<RequestStatus> RequestStatus { get; set; }
        /////
        public DbSet<Department> Department { get; set; }
        public DbSet<tblDepartment> tblDepartment { get; set; }
    }
}
