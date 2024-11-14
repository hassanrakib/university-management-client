import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
  data: {
    message: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  totalDocuments: number;
  totalPage: number;
};

// response type from backend
export type TResponse<T> = {
  data: T;
  meta?: TMeta;
  success: boolean;
  message: string;
};

// response type for redux
export type TResponseRedux<T> = {
  data?: TResponse<T>;
  error?: TError;
} & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
}
