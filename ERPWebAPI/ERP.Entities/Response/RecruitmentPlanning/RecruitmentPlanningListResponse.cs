using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Response.RecruitmentPlanning
{
     public class RecruitmentPlanningListResponse
    {
        [JsonProperty(PropertyName = "departmentname")]
        public string DepartmentName { get; set; }

        [JsonProperty(PropertyName = "departmentid")]
        public long DepartmentId { get; set; }

        [JsonProperty(PropertyName = "month")]
        public int Month { get; set; }

        [JsonProperty(PropertyName = "year")]
        public int Year { get; set; }

        [JsonProperty(PropertyName = "prevyear")]
        public int PrevYear { get; set; }

        [JsonProperty(PropertyName = "nextyear")]
        public int NextYear { get; set; }

        [JsonProperty(PropertyName = "april")]
        public int April { get; set; }

        [JsonProperty(PropertyName = "aprilplus")]
        public int AprilPlus { get; set; }

        [JsonProperty(PropertyName = "aprilminus")]
        public int AprilMinus { get; set; }

        [JsonProperty(PropertyName = "may")]
        public int May { get; set; }

        [JsonProperty(PropertyName = "mayplus")]
        public int MayPlus { get; set; }

        [JsonProperty(PropertyName = "mayminus")]
        public int MayMinus { get; set; }

        [JsonProperty(PropertyName = "june")]
        public int June { get; set; }

        [JsonProperty(PropertyName = "juneplus")]
        public int JunePlus { get; set; }

        [JsonProperty(PropertyName = "juneminus")]
        public int JuneMinus { get; set; }

        [JsonProperty(PropertyName = "july")]
        public int July { get; set; }

        [JsonProperty(PropertyName = "julyplus")]
        public int JulyPlus { get; set; }

        [JsonProperty(PropertyName = "julyminus")]
        public int JulyMinus { get; set; }

        [JsonProperty(PropertyName = "august")]
        public int August { get; set; }

        [JsonProperty(PropertyName = "augustplus")]
        public int AugustPlus { get; set; }

        [JsonProperty(PropertyName = "augustminus")]
        public int AugustMinus { get; set; }

        [JsonProperty(PropertyName = "september")]
        public int September { get; set; }

        [JsonProperty(PropertyName = "septemberplus")]
        public int SeptemberPlus { get; set; }

        [JsonProperty(PropertyName = "septemberminus")]
        public int SeptemberMinus { get; set; }

        [JsonProperty(PropertyName = "october")]
        public int October { get; set; }

        [JsonProperty(PropertyName = "octoberplus")]
        public int OctoberPlus { get; set; }

        [JsonProperty(PropertyName = "octoberminus")]
        public int OctoberMinus { get; set; }

        [JsonProperty(PropertyName = "november")]
        public int November { get; set; }

        [JsonProperty(PropertyName = "novemberplus")]
        public int NovemberPlus { get; set; }

        [JsonProperty(PropertyName = "novemberminus")]
        public int NovemberMinus { get; set; }

        [JsonProperty(PropertyName = "december")]
        public int December { get; set; }

        [JsonProperty(PropertyName = "decemberplus")]
        public int DecemberPlus { get; set; }

        [JsonProperty(PropertyName = "decemberminus")]
        public int DecemberMinus { get; set; }

        [JsonProperty(PropertyName = "january")]
        public int January { get; set; }

        [JsonProperty(PropertyName = "januaryplus")]
        public int JanuaryPlus { get; set; }

        [JsonProperty(PropertyName = "januaryminus")]
        public int JanuaryMinus { get; set; }

        [JsonProperty(PropertyName = "february")]
        public int February { get; set; }

        [JsonProperty(PropertyName = "februaryplus")]
        public int FebruaryPlus { get; set; }

        [JsonProperty(PropertyName = "februaryminus")]
        public int FebruaryMinus { get; set; }

        [JsonProperty(PropertyName = "march")]
        public int March { get; set; }

        [JsonProperty(PropertyName = "marchplus")]
        public int MarchPlus { get; set; }

        [JsonProperty(PropertyName = "marchminus")]
        public int MarchMinus { get; set; }

    }
}
