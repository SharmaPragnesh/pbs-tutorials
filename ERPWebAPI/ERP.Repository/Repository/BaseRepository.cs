using Common.Extension;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Repository.Repository
{
    public class BaseRepository
    {
        public static ApiResult<T> Response<T>(string success, string message, T data)
        {
            ApiResult<T> response = new ApiResult<T>();
            response.Success = success;
            response.Message = message;

            response.Data = data;
            return response;
        }
    }
}