import { ErrorTypes } from "./types";

export const isInitializedError = (): Promise<never> => {
  return Promise.reject(ErrorTypes.notInitialized);
};

export const isSubmoduleAlreadyInitializedError = (): Promise<never> => {
  return Promise.reject(ErrorTypes.alreadyInitializedSubmodule);
};

export const isModuleAlreadyInitializedError = (): Promise<never> => {
  return Promise.reject(ErrorTypes.alreadyInitializedModule);
};

export const isValidApiKeyError = (): Promise<never> => {
  return Promise.reject(ErrorTypes.validApiKey);
};
