using LearnEntity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearnEntity.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EngagementController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public EngagementController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("GetEngagements")]
        public IEnumerable<Engagement> GetEngagements(long clientId)
        {
            var engagement = _db.Engagement.Where(data => data.ClientId == clientId).ToList();
            return engagement;
        }
    }
}
