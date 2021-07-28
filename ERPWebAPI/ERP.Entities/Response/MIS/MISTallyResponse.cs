using Newtonsoft.Json;
using System;

namespace ERP.Entities.Response.MISTallyResponse
{
    public class MISTallyResponse
    {
        [JsonProperty(PropertyName = "id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "exportsales", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ExportSales { get; set; }

        [JsonProperty(PropertyName = "localsales", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LocalSales { get; set; }

        [JsonProperty(PropertyName = "localsalesbtob", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LocalSalesBtoB { get; set; }

        [JsonProperty(PropertyName = "localsalesbtoc", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LocalSalesBtoC { get; set; }

        [JsonProperty(PropertyName = "otherincome", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? OtherIncome { get; set; }

        [JsonProperty(PropertyName = "discountonsale", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DISCOUNTONSALE { get; set; }

        [JsonProperty(PropertyName = "incomeotherthansales", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IncomeOtherThanSales { get; set; }

        [JsonProperty(PropertyName = "staffaugmentation", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? StaffAugmentation { get; set; }

        [JsonProperty(PropertyName = "rentincome", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RENTINCOME { get; set; }

        [JsonProperty(PropertyName = "noticepayincome", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? NoticePayIncome { get; set; }

        [JsonProperty(PropertyName = "interestincome", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? INTERESTINCOME { get; set; }

        [JsonProperty(PropertyName = "refundfromincometax", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RefundFromIncomeTax { get; set; }

        [JsonProperty(PropertyName = "interestondepositswithbank", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestOnDepositsWithBank { get; set; }

        [JsonProperty(PropertyName = "miscincome", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? MiscIncome { get; set; }

        [JsonProperty(PropertyName = "excessprovisionwrittenback", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ExcessProvisionWrittenBack { get; set; }

        [JsonProperty(PropertyName = "incentivemicrosoftregional", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IncentiveMicrosoftRegional { get; set; }

        [JsonProperty(PropertyName = "insuranceclaim", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InsuranceClaim { get; set; }

        [JsonProperty(PropertyName = "interestonincometaxrefund", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestOnIncomeTaxRefund { get; set; }

        [JsonProperty(PropertyName = "profitonsaleofassets", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ProfitOnSaleOfAssets { get; set; }

        [JsonProperty(PropertyName = "jobworkcharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? JOBWORKCHARGES { get; set; }

        [JsonProperty(PropertyName = "employeeexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? EmployeeExpense { get; set; }

        [JsonProperty(PropertyName = "salary", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Salary { get; set; }

        [JsonProperty(PropertyName = "providentfund", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ProvidentFund { get; set; }

        [JsonProperty(PropertyName = "arrearsofsalary", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ArrearsOfSalary { get; set; }

        [JsonProperty(PropertyName = "exgratia", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ExGratia { get; set; }

        [JsonProperty(PropertyName = "gratuity", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Gratuity { get; set; }

        [JsonProperty(PropertyName = "leave", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LeaveEncashment { get; set; }

        [JsonProperty(PropertyName = "stipendtrainingallowance", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? StipendTRAININGALLOWANCE { get; set; }

        [JsonProperty(PropertyName = "stipend", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Stipend { get; set; }

        [JsonProperty(PropertyName = "trainingallowance", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? TRAININGALLOWANCE { get; set; }

        [JsonProperty(PropertyName = "perquisits", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Perquisits { get; set; }

        [JsonProperty(PropertyName = "rewardsandrecognition", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RewardsAndRecognition { get; set; }

        [JsonProperty(PropertyName = "performancelinkedincentive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PERFORMANCELINKEDINCENTIVE { get; set; }

        [JsonProperty(PropertyName = "staffwelfare", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? StaffWelfare { get; set; }

        [JsonProperty(PropertyName = "overseasstaffexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? OverSeasStaffExp { get; set; }

        [JsonProperty(PropertyName = "overtimefoodexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? OverTimeFoodExp { get; set; }

        [JsonProperty(PropertyName = "recruitmentexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RECRUITMENTEXP { get; set; }

        [JsonProperty(PropertyName = "trainingexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? TRAININGEXP { get; set; }

        [JsonProperty(PropertyName = "payrollexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PayrollExpenses { get; set; }

        [JsonProperty(PropertyName = "microsoftexamination", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? MicrosoftExamination { get; set; }

        [JsonProperty(PropertyName = "salesincentive", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SalesIncentive { get; set; }

        [JsonProperty(PropertyName = "incentivesalary", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IncentiveSalary { get; set; }

        [JsonProperty(PropertyName = "administrativeexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? AdministrativeExpenses { get; set; }

        [JsonProperty(PropertyName = "officeexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? OfficeExpense { get; set; }

        [JsonProperty(PropertyName = "printingstationary", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PrintingStationary { get; set; }

        [JsonProperty(PropertyName = "postagetelegram", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PostageTelegram { get; set; }

        [JsonProperty(PropertyName = "bankcharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BankCharges { get; set; }

        [JsonProperty(PropertyName = "mainbankcharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? MainBankCharges { get; set; }

        [JsonProperty(PropertyName = "foreignbankcommission", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ForeignBankCommission { get; set; }

        [JsonProperty(PropertyName = "paypalcharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PaypalCharges { get; set; }

        [JsonProperty(PropertyName = "servicechargesexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ServiceChargesExpense { get; set; }

        [JsonProperty(PropertyName = "servicetaxgstonforeigncurrency", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ServiceTaxGSTOnForeignCurrency { get; set; }

        [JsonProperty(PropertyName = "processingfees", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ProcessingFees { get; set; }

        [JsonProperty(PropertyName = "repairingexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RepairingExpense { get; set; }

        [JsonProperty(PropertyName = "computerrepairs", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ComputerRepairs { get; set; }

        [JsonProperty(PropertyName = "elecricalrepairs", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ElecricalRepairs { get; set; }

        [JsonProperty(PropertyName = "generalrepairs", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? GeneralRepairs { get; set; }

        [JsonProperty(PropertyName = "officehousekeepingexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? OfficeHousekeepingExpense { get; set; }

        [JsonProperty(PropertyName = "internetexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? INTERNETEXP { get; set; }

        [JsonProperty(PropertyName = "telephoneexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? TELEPHONEEXPENSES { get; set; }

        [JsonProperty(PropertyName = "legalprofessionalexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LegalProfessionalExpenses { get; set; }

        [JsonProperty(PropertyName = "auditfees", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Auditfees { get; set; }

        [JsonProperty(PropertyName = "membershipsubscription", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? MEMBERSHIPSUBSCRIPTION { get; set; }

        [JsonProperty(PropertyName = "computerrent", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ComputerRent { get; set; }

        [JsonProperty(PropertyName = "rentratestaxes", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RentRatestaxes { get; set; }

        [JsonProperty(PropertyName = "maintenancecharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? MAINTENANCECHARGES { get; set; }

        [JsonProperty(PropertyName = "amccharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? AMCCHARGES { get; set; }

        [JsonProperty(PropertyName = "depreciation", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DEPRECIATION { get; set; }

        [JsonProperty(PropertyName = "foreigncommission", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ForeignCommission { get; set; }

        [JsonProperty(PropertyName = "incometax", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IncomeTax { get; set; }

        [JsonProperty(PropertyName = "donation", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DONATION { get; set; }

        [JsonProperty(PropertyName = "electricitybill", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ELECTRICITYBILL { get; set; }

        [JsonProperty(PropertyName = "festivalexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? FESTIVALEXPENSE { get; set; }

        [JsonProperty(PropertyName = "insurancepremium", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? INSURANCEPREMIUM { get; set; }

        [JsonProperty(PropertyName = "empoyeremployeeinsurance", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? EmpoyerEmployeeInsurance { get; set; }

        [JsonProperty(PropertyName = "softwareexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SOFTWAREEXPENSES { get; set; }

        [JsonProperty(PropertyName = "loadingunloading", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LoadingUnloading { get; set; }

        [JsonProperty(PropertyName = "cashcreditcardsalarypeon", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? CashCreditCardSALARYPEON { get; set; }

        [JsonProperty(PropertyName = "vehicleexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? VehicleExpenses { get; set; }

        [JsonProperty(PropertyName = "professinaltaxcompany", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PROFESSIONALTAXCOMPANY { get; set; }

        [JsonProperty(PropertyName = "previousyearexporsalestaxexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PreviousYearExpOrSalesTaxExp { get; set; }

        [JsonProperty(PropertyName = "sbc", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SBC { get; set; }

        [JsonProperty(PropertyName = "exchangeratefluction", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? EXCHANGERATEFLUCTION { get; set; }

        [JsonProperty(PropertyName = "servicetax", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ServiceTax { get; set; }

        [JsonProperty(PropertyName = "roundoff", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? RoundOff { get; set; }

        [JsonProperty(PropertyName = "domainpurchase", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DomainPurchase { get; set; }

        [JsonProperty(PropertyName = "penalty", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Penalty { get; set; }

        [JsonProperty(PropertyName = "writtenoff", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? WrittenOff { get; set; }

        [JsonProperty(PropertyName = "waterexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? WaterExpenses { get; set; }

        [JsonProperty(PropertyName = "baddebts", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BADDEBTS { get; set; }

        [JsonProperty(PropertyName = "brokeragecharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BrokerageCharges { get; set; }

        [JsonProperty(PropertyName = "lossandsaleofasstes", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LOSSANDSALEOFASSTES { get; set; }

        [JsonProperty(PropertyName = "consultancycharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ConsultancyCharges { get; set; }

        [JsonProperty(PropertyName = "businesspromotion", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BusinessPromotion { get; set; }

        [JsonProperty(PropertyName = "cebitwpc", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? CebitWPC { get; set; }

        [JsonProperty(PropertyName = "exhibitionexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ExhibitionExp { get; set; }

        [JsonProperty(PropertyName = "travellingexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? TravellingExpenses { get; set; }

        [JsonProperty(PropertyName = "foreigntraveling", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ForeignTraveling { get; set; }

        [JsonProperty(PropertyName = "localtraveling", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? LocalTraveling { get; set; }

        [JsonProperty(PropertyName = "conveyance", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Conveyance { get; set; }

        [JsonProperty(PropertyName = "visaandtravelllinginsuexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? VisaAndTravelllingInsuExp { get; set; }

        [JsonProperty(PropertyName = "advertisementexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ADVERTISEMENTEXP { get; set; }

        [JsonProperty(PropertyName = "meetingexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? MeetingExpense { get; set; }

        [JsonProperty(PropertyName = "businessmeeting", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BUSINESSMEETING { get; set; }

        [JsonProperty(PropertyName = "businesspromotionexp", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BUSINESSPROMOTIONExp { get; set; }

        [JsonProperty(PropertyName = "misc", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? Misc { get; set; }

        [JsonProperty(PropertyName = "seoconsultant", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SEOConsultant { get; set; }

        [JsonProperty(PropertyName = "seminarconferance", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SEMINARCONFERENCE { get; set; }

        [JsonProperty(PropertyName = "webdevelopmentcharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? WEBDEVELOPMENTCHARGES { get; set; }

        [JsonProperty(PropertyName = "interestexpenses", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestExpenses { get; set; }

        [JsonProperty(PropertyName = "intercointerest", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterCoInterest { get; set; }

        [JsonProperty(PropertyName = "intonunsloans", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? IntOnUnsLoans { get; set; }

        [JsonProperty(PropertyName = "interesttoothers", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? INTERESTTOOTHERS { get; set; }

        [JsonProperty(PropertyName = "interestonunsecuredloans", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestOnUnsecuredLoans { get; set; }

        [JsonProperty(PropertyName = "bankintrest", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? BankInterest { get; set; }

        [JsonProperty(PropertyName = "interestoncreditcard", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? InterestOnCreditCard { get; set; }

        [JsonProperty(PropertyName = "salaryandperquisitestomanagingdirector", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SalaryAndPerquisitesToManagingDirector { get; set; }

        [JsonProperty(PropertyName = "dressallowancetodirector", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DressAllowanceToDirector { get; set; }

        [JsonProperty(PropertyName = "hardikshahmedicalallowance", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? HardikShahMedicalAllowance { get; set; }

        [JsonProperty(PropertyName = "hra", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? HRA { get; set; }

        [JsonProperty(PropertyName = "perquisiteclubfees", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? PerquisiteClubFees { get; set; }

        [JsonProperty(PropertyName = "salarydirector", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? SalaryDirector { get; set; }

        [JsonProperty(PropertyName = "felicitationcharges", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? FelicitationCharges { get; set; }

        [JsonProperty(PropertyName = "monitorsalesincome", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? MonitorSalesIncome { get; set; }

        [JsonProperty(PropertyName = "acsalesincome", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? ACSalesIncome { get; set; }

        [JsonProperty(PropertyName = "deferredtaxexpense", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? DeferredTaxExpense { get; set; }

        [JsonProperty(PropertyName = "CreatedDate", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public DateTime? CreatedDate { get; set; }

        [JsonProperty(PropertyName = "month", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int? Month { get; set; }

        [JsonProperty(PropertyName = "year", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public int? Year { get; set; }

        [JsonProperty(PropertyName = "netprofitbysalesratio", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? NetProfitBySalesRatio { get; set; }

        [JsonProperty(PropertyName = "empcostbysalesratio", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public double? EmpCostBySalesRatio { get; set; }
    }
}