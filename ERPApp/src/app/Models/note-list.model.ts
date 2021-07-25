export class NoteList {
    InstitutionId?: number;
    StudyId?: number;
    SemesterId?: number;
    SubjectId?: number;
}

export class Files {
    FileId: number;
    FileName: string;
    FileType: string;
    FileTitle: string;//N
    FileDescription: string;//N
    FilePath: string;//N
    InstitutionId: number;//N
    InstitutionName: string;
    StudyId: number;//N
    StudyName: string;
    TermType: string;
    SemesterId: number;//N
    // // // SubjectNo?: number;
    Keyword1: number;//N
    Keyword2: number;//N
    Keyword3: number;//N
    Keyword4: number;//N
    Keyword5: number;//N
    SemesterNo: number;
    SemesterOrdering?: number;
    SemesterName: string;
    SubjectId?: number;//N
    SubjectName: string;
    AverageScore: number;
    Keywords: string;
    ApprovalDate?: Date;
    CreatedDate: Date;
    Initials: string;
    UserFullName: string;
    GuId: string;//Non DB
    File?: Blob;
    Checked?: boolean = false;
    UserId?: number;
    FileSize?: number;
    FileSizeType: string;
}

export class SearchFiles {
    FilesFoundList: Files[];
    FilesNotFoundList: Files[];
}

export class SearchFilesStudyList {
    StudyId: number;
    FilesList: Files[];
}

export class FilesParameter {
    InstitutionId?: number;
    InstitutionName?: string;
    StudyId?: number;
    StudyName?: string;
    SemesterId?: number;
    TermType?: string;
    SemesterNo?: number;
    SemesterName?: string;
    SubjectId?: number;
    FileId?: number;
    // // // SubjectNo?: number;
    SubjectName?: string;
    LanguageId?: number;
    IsApproved?: number;
    SearchText?: string;
}

export enum TermType {
    Semester = "Semester",
    Year = "Semester",
}

export class Feedback {
    FeedbackType?: number;
    FeedbackComment: string;
    Image64String: string;
    ContactMe?: boolean;
    LanguageId?: number;
    UserId?: number;
    UserFullName: string;
}

export class Remark {
    RemarkId: number;
    RemarkText: string;
    FileId: number;
    UserId: number;
}

export class RemarkParameter {
    FileId: number;
    RemarkId?: number;
}

export class FileScore {
    FileId: number;
    Score: number;
}

export class FileScoreParameter {
    FileId: number;
}

export class UserSubjectInterest {
    UserSubjectInterestId: number;
    InstitutionName: string;
    StudyName: string;
    SemesterName: string;
    SubjectName: string;
}

export class UserSubjectInterestParameter {
    UserSubjectInterestId?: number;
    SubjectId?: number;
    UserId: number;
    LanguageId: number;
}