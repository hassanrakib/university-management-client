import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllSemesters: builder.query({
    //   query: (args: TQueryParam[]) => {
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, String(item.value));
    //       });
    //     }

    //     return {
    //       url: "/academic-semesters",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   transformResponse: (response: TResponse<AcademicSemester[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation } = userManagementApi;
