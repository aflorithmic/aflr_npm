import { ErrorTypes } from "./types";

export const isInitializedError = (): Promise<never> => {
  return Promise.reject(ErrorTypes.notInitialized);
};

export const isAlreadyInitializedError = (): Promise<never> => {
  return Promise.reject(ErrorTypes.alreadyInitialized);
};

export const isValidApiKeyError = (): Promise<never> => {
  return Promise.reject(ErrorTypes.validApiKey);
};
