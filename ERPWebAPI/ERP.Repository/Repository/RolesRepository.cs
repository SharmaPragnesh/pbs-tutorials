using Common.Extension;
using ERP.Entities;
using ERP.Entities.Roles;
using ERP.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Extension;
using System.Data.SqlClient;

namespace ERP.Repository.Repository
{
    public class RolesRepository : IRolesRepository ///, BaseRepository
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly string _connectionString = "Data Source=erptrainee.database.windows.net;Initial Catalog=ERPTrainees_DEV;User ID=erpadmin;password=psspl@12345;";

        public RolesRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Page<RolesResponse>> GetRoles(PageParameter pageParameter)
        {
            int from = 0, size = 10;
            string searchText = string.Empty;
            string secondarySearchText = string.Empty;
            DateTime todaysDate = DateTime.UtcNow.Date;

            if (Convert.ToInt32(pageParameter.PageSize) != 0)
            {
                size = Convert.ToInt32(pageParameter.PageSize);
                from = (Convert.ToInt32(pageParameter.PageStart) - 1) * size;
            }

            Page<RolesResponse> result = new Page<RolesResponse>();
            int activeStatus = (int)Enums.Status.Active;
            IQueryable<RolesResponse> query = null;
            query = (from roles in _dbContext.Roles
                     where roles.Active == activeStatus
                     select new RolesResponse()
                     {
                         Id = roles.Id,
                         Name = roles.Name,
                         IsActive = roles.Active
                     });

            #region Sorting

            string sortOrder = pageParameter.SortOrder.ToLower(CultureInfo.InvariantCulture) == Common.Extension.Constants.SortOrder.Descending
                ? Common.Extension.Constants.SortOrder.Descending : Common.Extension.Constants.SortOrder.Ascending;

            string sortColumn = Convert.ToString(pageParameter.SortColumn).ToLower(CultureInfo.InvariantCulture);

            if (sortColumn == "Name".ToLower(CultureInfo.InvariantCulture))
            {
                query = sortOrder == Constants.SortOrder.Ascending ?
                    query.OrderBy(u => u.Name) : query.OrderByDescending(u => u.Name);
            }
            else if (sortColumn == "id".ToLower(CultureInfo.InvariantCulture))
            {
                query = sortOrder == Constants.SortOrder.Ascending ?
                    query.OrderBy(u => u.Id) : query.OrderByDescending(u => u.Id);
            }
            else if (sortColumn == "IsActive".ToLower(CultureInfo.InvariantCulture))
            {
                query = sortOrder == Constants.SortOrder.Ascending ?
                    query.OrderBy(u => u.IsActive) : query.OrderByDescending(u => u.IsActive);
            }
            else
            {
                //Indicates default sorting
                query = query.OrderByDescending(u => u.Id);
            }

            #endregion

            result.TotalCount = query.Count();


            #region Paging

            if (size != -1)
                query = query.Skip(from).Take(size);

            #endregion

            result.List = query.ToList();

            //var lstRoles = _db.Roles.ToList();
            //result.List = lstRoles;
            return result;

            /*
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("USP_GetRoles", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Search", pageParameter.Search));
                    cmd.Parameters.Add(new SqlParameter("@PageNbr", pageParameter.PageStart));
                    cmd.Parameters.Add(new SqlParameter("@PageSize", pageParameter.PageSize));
                    cmd.Parameters.Add(new SqlParameter("@SortCol", pageParameter.SortColumn + "_" + pageParameter.SortOrder));

                    var response = new List<RolesResponse>();
                    Page<RolesResponse> result = new Page<RolesResponse>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.TotalCount = Convert.ToInt32(reader["MaxRows"]);
                            response.Add(MapToValue(reader));
                        }
                    }

                    result.List = response;
                    result.PageCount = response != null ? response.Count : 0;
                    result.PageStart = pageParameter.PageStart;
                    result.PageSize = pageParameter.PageSize;
                    //result.TotalCount = response.Count;

                    return result;
                    //return Response<Page<RolesResponse>>("sucess", string.Empty, result);
                }
            }              
             
             */
        }
        private RolesResponse MapToValue(SqlDataReader reader)
        {
            return new RolesResponse()
            {
                Id = Convert.ToInt32(reader["id"]),
                Name = Convert.ToString(reader["name"]),
                IsActive = Convert.ToByte(reader["Active"])
            };
        }

        public async Task InsertRoles(RolesResponse rolesResponse)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("USP_InsertRoles", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", rolesResponse.Id));
                    cmd.Parameters.Add(new SqlParameter("@Name", rolesResponse.Name));
                    cmd.Parameters.Add(new SqlParameter("@CreatedBy", rolesResponse.CreatedBy));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return;
                }
            }
        }

        public async Task UpdateRoles(RolesResponse rolesResponse)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("USP_UpdateRoles", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", rolesResponse.Id));
                    cmd.Parameters.Add(new SqlParameter("@Name", rolesResponse.Name));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return;
                }
            }
        }
    }
}
