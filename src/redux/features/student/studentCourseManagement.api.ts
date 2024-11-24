import { TQueryParam, TResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, String(item.value));
          });
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponse<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offeredCourses"],
    }),
    addEnrolledCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourses"],
    }),
  }),
});

export const { useGetAllOfferedCoursesQuery, useAddEnrolledCourseMutation } =
  studentCourseApi;
