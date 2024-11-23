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
    }),
    // addSemesterRegistration: builder.mutation({
    //   query: (data) => ({
    //     url: "/semester-registrations/create-semester-registration",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["semesterRegistrations"],
    // }),
  }),
});

export const { useGetAllOfferedCoursesQuery } = studentCourseApi;
