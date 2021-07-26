export class Roles {
    id: number;
    name: string;
    isActive: number;
}

// export class RolesParameter {
//     InstitutionNo?: number;
//     LanguageId: number;
// }

export class PageParameter {
    Search: string;
    SortColumn: string;
    SortOrder: string;
    PageStart: number;
    PageSize: number;
}

// export class Institution {
//     InstitutionId: number;
//     InstitutionNo: number;
//     InstitutionName?: string; //NonDB
//     InstitutionNameDaDK: string;
//     InstitutionNameEnUS: string;
//     IsForDelete: boolean;
//     Sorting: number;
//     UpDown?: string;
//     Show: boolean = false; //add this model for only UI open/close click purpose.
// }
