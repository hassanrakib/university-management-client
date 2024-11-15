import { TQueryParam, TResponse } from "../../../types";
import { TSemesterRegistration } from "../../../types/courseManagement.type";
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
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSemesterRegistrationsQuery,
  useAddSemesterRegistrationMutation,
} = courseManagementApi;
