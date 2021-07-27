import { LookUpResponse } from "./common.model";

export class TimeSheet {
    ProjectList: LookUpResponse[];
    ResourceList: LookUpResponse[];
    CurrentYear: number;
    CurrentMonth: number;
}