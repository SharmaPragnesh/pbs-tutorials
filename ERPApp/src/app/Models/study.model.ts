export class Study {
    StudyId: number;
    InstitutionId: number;
    StudyNo: number;
    StudyName?: string; //NonDB
    StudyNameDaDK: string;
    StudyNameEnUS: string;
    TermType: string;
    TermTypeId?: number;
    SemesterNo?: number;
    IsForDelete: boolean;
    Sorting: number;
    UpDown?: string;
}

export class StudyParameter {
    InstitutionId?: number;
    LanguageId: number;
    StudyId?: number;
    StudyNo?: number;
}

export class TermTypes {
    TermTypeId: number;
    TermType?: string; //NonDB
    TermTypeDaDK: string;
    TermTypeEnUS: string;
    NoOfStudyExists?: number;
}

export class TermTypesParameter {
    TermTypeId?: number;
    LanguageId: number;
}