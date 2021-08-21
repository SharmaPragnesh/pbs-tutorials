export class Client {
    ClientId: number;
    ClientName: string;
    ClientCode: string;
    Status: number; //Enum-ClientStatusType
    ContactNumber: string;
    EmailId: string;
    Fax: string;
    ClientIndustryId: number; //Class-ClientIndustry
}

export class ClientIndustry {
    ClientIndustryId: number;
    ClientIndustryName: string;
}

export enum ClientStatusType {
    Inactive = 0,
    Active = 1,
    Blacklist = 2
}
