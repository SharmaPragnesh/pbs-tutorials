using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Extension
{
    public static class Enums
    {
        /// <summary>
        /// Status Enum
        /// </summary>
        public enum Status
        {
            Active = 1,
            InActive = 2,
        }
        public enum TechnicalCapability
        {

            One = 1,
            Two = 2,
            Three = 3,
            Four = 4

        }


        public enum Months
        {
            January = 1,
            February = 2,
            March = 3,
            April = 4,
            May = 5,
            June = 6,
            July = 7,
            August = 8,
            September = 9,
            October = 10,
            November = 11,
            December = 12,
        }

        public enum ProjectSources
        {
            TFS15 = 1,
            TFS17 = 2,
            TFS19 = 3,
            AzureDevOps = 4,
            Local = 5
        }

        public enum TicketEvents
        {
            TicketLogged = 1,
            AssignmentChanged = 2,
            StatusChanged = 3,
            Escalated = 4,
            InformationUpdated = 5
        }
    }
}
