import { AcademicSemester } from "./academicManagement.type"

export type TSemesterRegistration = {
    _id: string,
    academicSemester: AcademicSemester,
    status: string;
    startDate: string,
    endDate: string,
    minCredit: number,
    maxCredit: number,
}

export type Course = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: PreRequisiteCourse[];
    isDeleted: boolean;
    __v: number;
};

export type PreRequisiteCourse = {
    course: Course;
    isDeleted: boolean;
    _id: string;
};
