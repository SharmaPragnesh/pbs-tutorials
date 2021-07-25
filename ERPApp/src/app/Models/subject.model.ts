export class Subject {
    SubjectId: number;
    SemesterId: number;
    SemesterNo?: number;
    SemesterName?: string;
    SemesterIds: string;
    SubjectNo: number;
    SubjectName?: string; //NonDB
    SubjectNameDaDK: string;
    SubjectNameEnUS: string;
    IsForDelete: boolean;
    Sorting: number;
    UploadedFiles?: number = 0;
    UpDown?: string;
}

export class SubjectParameter {
    SemesterId?: number;//
    LanguageId: number;
    SubjectId?: number;
    SubjectNo?: number;
    InstitutionId?: number;//For Semester Validate while Adding
    StudyId?: number;//For Semester Validate while Adding
    SemesterNo?: number;//For Semester Validate while Adding
}

export class SubjectMapping {
    SemesterId: number;
    SubjectIds: string;
    LanguageId: number;
}

export class SubjectMappingParameter {
    SemesterId?: number;
    LanguageId: number;
}

export class SubjectLookup extends Subject {
    StudyName: string;
    InstitutionName: string;
}