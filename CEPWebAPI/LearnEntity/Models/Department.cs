using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }

        public string DepartmentCode { get; set; }

        public string DescriptionName { get; set; }
    }

    public class tblDepartment
    {
        [Key]
        public int DeptId { get; set; }

        public string DeptName { get; set; }
    }
}
