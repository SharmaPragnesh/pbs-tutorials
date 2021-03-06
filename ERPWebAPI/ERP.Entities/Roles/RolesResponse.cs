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

        /////
        public int? EnumValue { get; set; }
        public string LandingURL { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class Roles
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public byte Active { get; set; }
    }
}
