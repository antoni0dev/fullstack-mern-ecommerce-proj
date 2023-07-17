const isServerError = (error: any) => {
  return error && typeof error.message === "string";
};

export const getErrorMessage = (error: any): string => {
  if (isServerError(error)) {
    return error.message;
  }

  if (error.error) {
    return error.error;
  }

  return "An unknwon error occured";
};
