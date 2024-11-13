export type AcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type AcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: AcademicFaculty;
  createdAt: string;
  updatedAt: string;
  __v: number;
}