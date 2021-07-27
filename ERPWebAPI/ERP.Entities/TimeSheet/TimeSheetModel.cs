using ERP.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Entities.TimeSheet
{
    public class TimeSheetModel
    {
        public List<LookUpResponse> ProjectList { get; set; }
        public List<LookUpResponse> ResourceList { get; set; }

        //public List<TimeSheetGridModel> Timesheetlist { get; set; }

        //public List<WeeklyTimesheetModel> WeeklyTimesheetData { get; set; }

        //public List<HolidayListModel> HolidaysList { get; set; }
        public int CurrentYear { get; set; }
        public int CurrentMonth { get; set; }
        public List<DateTime> DateRange { get; set; }
        public string MonthName { get; set; }
        public int LowestYear { get; set; }
        public int HighestYear { get; set; }
        public DateTime CurrentStartDate { get; set; }
        public DateTime CurrentEndDate { get; set; }
    }
}
