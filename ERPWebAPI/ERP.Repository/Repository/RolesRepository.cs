using Common.Extension;
using ERP.Entities.Roles;
using ERP.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Repository.Repository
{
    public class RolesRepository : IRolesRepository ///, BaseRepository
    {
        private readonly string _connectionString = "Data Source=erptrainee.database.windows.net;Initial Catalog=ERPTrainees_DEV;User ID=erpadmin;password=psspl@12345;";

        public async Task<Page<RolesResponse>> GetRoles(PageParameter pageParameter)
        {
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
