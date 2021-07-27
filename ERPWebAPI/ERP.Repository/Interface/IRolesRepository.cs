using Common.Extension;
using ERP.Entities.Roles;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Repository.Interface
{
    public interface IRolesRepository
    {
        Task<Page<RolesResponse>> GetRoles(PageParameter pageParameter);

        Task InsertRoles(RolesResponse rolesResponse);
        Task UpdateRoles(RolesResponse rolesResponse);
    }
}
