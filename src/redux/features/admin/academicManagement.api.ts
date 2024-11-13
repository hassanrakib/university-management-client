import { AcademicSemester, TQueryParam, TResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, String(item.value));
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponse<AcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAcademicFaculties: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
    }),
    getAcademicDepartments: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useGetAcademicFacultiesQuery,
  useGetAcademicDepartmentsQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
