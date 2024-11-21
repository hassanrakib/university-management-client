import { TQueryParam, TResponse } from "../../../types";
import {
  Course,
  TSemesterRegistration,
} from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSemesterRegistrations: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, String(item.value));
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponse<TSemesterRegistration[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["semesterRegistrations"],
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semesterRegistrations"],
    }),
    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.semesterRegistrationId}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semesterRegistrations"],
    }),
    getAllCourses: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, String(item.value));
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponse<Course[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    assignFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
    }),
    getCourseFaculties: builder.query({
      query: (courseId: string) => {
        return {
          url: `/courses/${courseId}/get-faculties`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetSemesterRegistrationsQuery,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
  useAddSemesterRegistrationMutation,
  useAddCourseMutation,
  useUpdateSemesterRegistrationMutation,
  useAssignFacultiesMutation,
} = courseManagementApi;
