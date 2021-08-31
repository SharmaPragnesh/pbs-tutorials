using LearnEntity.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public DepartmentController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<tblDepartment> Get()
        {
            var departmentList = _db.tblDepartment.ToList();
            return departmentList;
        }

        //[HttpGet]
        //public IEnumerable<Department> Get()
        //{
        //    var departmentList = _db.Department.ToList();
        //    return departmentList;

        //    //var rng = new Random();
        //    //return Enumerable.Range(1, 5).Select(index => new Department
        //    //{
        //    //    DepartmentId   = rng.Next(-20, 55),
        //    //    DepartmentCode = "Code" + Convert.ToString(rng.Next(-20, 55)),
        //    //    DescriptionName = "Name" + Convert.ToString(rng.Next(-20, 55)),
        //    //})
        //    //.ToArray();
        //}
    }
}
