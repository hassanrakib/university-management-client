import {
  AcademicDepartment,
  AcademicFaculty,
  AcademicSemester,
} from "./academicManagement.type";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export enum TBloodGroup {
  "A+" = "A+",
  "A-" = "A-",
  "B+" = "B+",
  "B-" = "B-",
  "AB+" = "AB+",
  "AB-" = "AB-",
  "O+" = "O+",
  "O-" = "O-",
}

export interface TUser {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TStudent {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  admissionSemester: AcademicSemester;
  academicDepartment: AcademicDepartment;
  academicFaculty: AcademicFaculty;
  isDeleted?: boolean;
}
