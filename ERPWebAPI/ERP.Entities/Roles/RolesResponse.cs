using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Entities.Roles
{
    public class RolesResponse
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public byte IsActive { get; set; }
    }
}
