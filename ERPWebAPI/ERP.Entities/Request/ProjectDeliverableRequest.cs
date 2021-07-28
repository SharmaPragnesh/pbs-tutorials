using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.Entities.Request
{
    public class ProjectDeliverableRequest
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectID { get; set; }

        [JsonProperty(PropertyName = "projectdeliverdetailid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long ProjectDeliverDetailID { get; set; }

        [JsonProperty(PropertyName = "approvalofdeliverable", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string ApprovalOfDeliverable { get; set; }

        [JsonProperty(PropertyName = "rejectionofdeliverable", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string RejectionOfDeliverable { get; set; }

        [JsonProperty(PropertyName = "notificationofapprovalorrejection", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string NotificationOfApprovalOrRejection { get; set; }

        [JsonProperty(PropertyName = "projectdeliverables", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public List<string> ProjectDeliverables { get; set; }

        [JsonProperty(PropertyName = "isactive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public byte IsActive { get; set; }

        [JsonProperty(PropertyName = "createdbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long CreatedByID { get; set; }

        [JsonProperty(PropertyName = "updatedbyid", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long UpdatedByID { get; set; }

    }
}
