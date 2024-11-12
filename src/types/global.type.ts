export type TError = {
    data: {
      message: string;
      success: boolean;
    };
    status: number;
};

export type TResponse = {
  data?: any;
  error?: TError;
};
