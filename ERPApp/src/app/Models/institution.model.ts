export class Institution {
    InstitutionId: number;
    InstitutionNo: number;
    InstitutionName?: string; //NonDB
    InstitutionNameDaDK: string;
    InstitutionNameEnUS: string;
    IsForDelete: boolean;
    Sorting: number;
    UpDown?: string;
    Show: boolean = false; //add this model for only UI open/close click purpose.
}

export class InstitutionParameter {
    InstitutionNo?: number;
    LanguageId: number;
}