export class User {
    UserId: number;
    FirstName: string;
    LastName: string;
    Initials: string;
    LanguageId: number;
    Email: string;
    UserName: string;
    Password: string;
    Mobile: string;
    IsAdmin: boolean;
    SendNotification: boolean;
    StartingDate?: Date;
    LastLoginDate?: Date;
    FilesUploaded: number;
    SubjectInterestCount: number;
    UserGuId: string;
    IsActive?: boolean;
    UserLoginType?: UserLoginType;
    IsForDelete?: boolean;
}

export enum UserLoginType {
    Application = 1,
    Google = 2,
    Facebook = 3
}

export class UserParameter {
    UserId?: number;
    Email: string;
    UserName?: string;
    IsActive?: boolean;
}

export class UserInfo {
    UserId: number;
    FirstName: string;
    LastName: string;
    Initials: string;
    LanguageId: number;
    Email: string;
    Mobile: string;
    Token: string;
}

export enum Role {
    User = 'User',
    Admin = 'Admin'
}