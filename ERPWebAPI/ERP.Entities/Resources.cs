using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ERP.Entities
{
    public class Resources
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public long RoleId { get; set; }

        [NotMapped]
        public string RoleName { get; set; }

        public string Designation { get; set; }

        public byte Active { get; set; }
    }
}
