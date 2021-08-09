using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP.Entities.Common;
using ERP.Entities.TimeSheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERPWebAPI.Controllers
{
    public class TaskTimeSheet
    {
        public int id { get; set; }
        public int issue_id { get; set; }
        public string issue_title { get; set; }
        public int project_id { get; set; }
        public string project_name { get; set; }
        public string project_identifier { get; set; }
        public int user_id { get; set; }
        public string user { get; set; }
        public string hours { get; set; }
        public string comments { get; set; }
        public int activity_id { get; set; }
        public int assigned_to_id { get; set; }
        public string spent_on { get; set; }
        public DateTime created_on { get; set; }
        public DateTime updated_on { get; set; }
    }
    public class Result
    {
        public bool success { get; set; }
        public List<TaskTimeSheet> data { get; set; }
    }

    [Route("[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        [HttpGet]
        public async Task<Result> GetAsync()
        {
            Result result = new Result();
            
            List<TaskTimeSheet> lst = new List<TaskTimeSheet>();
            TaskTimeSheet taskTimeSheet = new TaskTimeSheet();
            taskTimeSheet.id = 4133;
            taskTimeSheet.issue_id = 1092;
            taskTimeSheet.issue_title = "QA Team Internal Training Session";
            taskTimeSheet.project_id = 29;
            taskTimeSheet.project_name = "Training and Developemnt";
            taskTimeSheet.project_identifier = "psspl-000031";
            taskTimeSheet.user_id = 34;
            taskTimeSheet.user = "Divyesh Parmar";
            taskTimeSheet.hours = "3";
            taskTimeSheet.comments = "Kick off meeting with client how to develop application";
            taskTimeSheet.activity_id = 12;
            taskTimeSheet.assigned_to_id = 34;
            taskTimeSheet.spent_on = "2021-07-31";
            taskTimeSheet.created_on = Convert.ToDateTime("2021/08/02");
            taskTimeSheet.updated_on = Convert.ToDateTime("2021/08/01");
            lst.Add(taskTimeSheet);

            taskTimeSheet = new TaskTimeSheet();
            taskTimeSheet.id = 4134;
            taskTimeSheet.issue_id = 1092;
            taskTimeSheet.issue_title = "QA Team Internal Training Session";
            taskTimeSheet.project_id = 29;
            taskTimeSheet.project_name = "Training and Developemnt";
            taskTimeSheet.project_identifier = "psspl-000031";
            taskTimeSheet.user_id = 34;
            taskTimeSheet.user = "Divyesh Parmar";
            taskTimeSheet.hours = "1";
            taskTimeSheet.comments = "Design the model structure and architecture.";
            taskTimeSheet.activity_id = 12;
            taskTimeSheet.assigned_to_id = 34;
            taskTimeSheet.spent_on = "2021-07-31";
            taskTimeSheet.created_on = Convert.ToDateTime("2021/08/02");
            taskTimeSheet.updated_on = Convert.ToDateTime("2021/08/01");
            lst.Add(taskTimeSheet);

            taskTimeSheet = new TaskTimeSheet();
            taskTimeSheet.id = 4135;
            taskTimeSheet.issue_id = 1092;
            taskTimeSheet.issue_title = "QA Team Internal Training Session";
            taskTimeSheet.project_id = 29;
            taskTimeSheet.project_name = "Training and Developemnt";
            taskTimeSheet.project_identifier = "psspl-000031";
            taskTimeSheet.user_id = 34;
            taskTimeSheet.user = "Divyesh Parmar";
            taskTimeSheet.hours = "1.5";
            taskTimeSheet.comments = "Training session with Raj regarding his path and testing points";
            taskTimeSheet.activity_id = 13;
            taskTimeSheet.assigned_to_id = 34;
            taskTimeSheet.spent_on = "2021-07-31";
            taskTimeSheet.created_on = Convert.ToDateTime("2021/08/02");
            taskTimeSheet.updated_on = Convert.ToDateTime("2021/08/01");
            lst.Add(taskTimeSheet);

            taskTimeSheet = new TaskTimeSheet();
            taskTimeSheet.id = 4136;
            taskTimeSheet.issue_id = 1089;
            taskTimeSheet.issue_title = "Corporate Training Session";
            taskTimeSheet.project_id = 29;            
            taskTimeSheet.project_name = "Training and Developemnt";
            taskTimeSheet.project_identifier = "psspl-000031";
            taskTimeSheet.user_id = 34;
            taskTimeSheet.user = "Divyesh Parmar";
            taskTimeSheet.hours = "3.25";
            taskTimeSheet.comments = "Session Redmine & Financial Happiness-JSN";
            taskTimeSheet.activity_id = 13;
            taskTimeSheet.assigned_to_id = 34;
            taskTimeSheet.spent_on = "2021-07-30";
            taskTimeSheet.created_on = Convert.ToDateTime("2021/08/03");
            taskTimeSheet.updated_on = Convert.ToDateTime("2021/08/04");
            lst.Add(taskTimeSheet);

            taskTimeSheet = new TaskTimeSheet();
            taskTimeSheet.id = 4139;
            taskTimeSheet.issue_id = 1174;
            taskTimeSheet.issue_title = "Learn Power BI";
            taskTimeSheet.project_id = 29;
            taskTimeSheet.project_name = "Training and Developemnt";
            taskTimeSheet.project_identifier = "psspl-000031";
            taskTimeSheet.user_id = 29;
            taskTimeSheet.user = "Pragnesh Sharma";
            taskTimeSheet.hours = "4.00";
            taskTimeSheet.comments = "Information of Financial Happiness";
            taskTimeSheet.activity_id = 13;
            taskTimeSheet.assigned_to_id = 29;
            taskTimeSheet.spent_on = "2021-07-17";
            taskTimeSheet.created_on = Convert.ToDateTime("2021/08/05");
            taskTimeSheet.updated_on = Convert.ToDateTime("2021/08/06");
            lst.Add(taskTimeSheet);

            result.success = true;
            result.data = lst;
            return result;
            //TimeSheetModel obj = new TimeSheetModel();
            //obj.ProjectList = ProjectList();
            //obj.ResourceList = ResourceList();
            //return obj;
        }

        public List<LookUpResponse> ProjectList()
        {
            List<LookUpResponse> lst = new List<LookUpResponse>();
            lst.Add(new LookUpResponse() { Id = 1, DisplayText = "Cooks Plumbing", DisplayValue = "AAAAA", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 2, DisplayText = "AirBase", DisplayValue = "BBBB", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 3, DisplayText = "Aricraft", DisplayValue = "CCCC", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 4, DisplayText = "ECL-EKM", DisplayValue = "DDDD", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 5, DisplayText = "Health Data Integration", DisplayValue = "EEEE", IsDefault = true });
            return lst;
        }

        public List<LookUpResponse> ResourceList()
        {
            List<LookUpResponse> lst = new List<LookUpResponse>();
            lst.Add(new LookUpResponse() { Id = 1, DisplayText = "Mikunj Rathwa", DisplayValue = "AA", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 2, DisplayText = "Richa Khatri", DisplayValue = "BB", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 3, DisplayText = "Bhavini Sharma", DisplayValue = "CC", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 4, DisplayText = "Preet Joshi", DisplayValue = "DD", IsDefault = true });
            lst.Add(new LookUpResponse() { Id = 5, DisplayText = "Neha Pandya", DisplayValue = "EE", IsDefault = true });
            return lst;
        }
    }
}
