export class Semester {
    SemesterId: number;
    InstitutionId?: number; //NonDB
    InstitutionName?: string; //NonDB
    StudyId: number;
    StudyName?: string; //NonDB
    SemesterNo: number;
    SemesterName?: string; //New for Period/TermType
    SemesterNameDaDK?: string; //New for Period/TermType
    SemesterNameEnUS?: string; //New for Period/TermType
    UploadedFiles?: number;
    IsForDelete: boolean;
    IsModified?: boolean;
    Sorting?: number;
    UpDown?: string;
    UserId?: number;
}

export class SemesterParameter {
    StudyId?: number;
    LanguageId: number;
    SemesterId?: number;
    SemesterNo?: number;
} 