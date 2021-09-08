using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Models
{
    public class Group
    {
        [Key]
        public int GroupID { get; set; }
        public string GroupName { get; set; }
    }
}
