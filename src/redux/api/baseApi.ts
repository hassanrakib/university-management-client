import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    // if token, set access token to the 'authorization' of the req header
    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if resource not found
  if (result.error?.status === 404) {
    toast.error(result.error.data.message);
  }

  // if access token is invalid get a new access token
  if (result.error?.status === 401) {
    // send refresh token from cookies with this request to get the access token
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    console.log(data);

    // if the refreshToken is valid & everything goes well we get the accessToken
    if (data.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user!;

      // set the user with new access token
      api.dispatch(setUser({ user, token: data.data.accessToken }));

      // call the baseQuery again as we have the new valid accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["semesterRegistrations", "courses", "offeredCourses"],
  endpoints: () => ({}),
});
