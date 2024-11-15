import { AcademicSemester } from "./academicManagement.type"

export type TSemesterRegistration = {
    academicSemester: AcademicSemester,
    status: string;
    startDate: string,
    endDate: string,
    minCredit: number,
    maxCredit: number,
}