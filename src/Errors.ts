import { ErrorTypes } from "./types";

export const isInitializedError = (): void => {
  throw new Error(ErrorTypes.notInitialized);
};

export const isSubmoduleAlreadyInitializedError = (): void => {
  throw new Error(ErrorTypes.alreadyInitializedSubmodule);
};

export const isModuleAlreadyInitializedError = (): void => {
  throw new Error(ErrorTypes.alreadyInitializedModule);
};

export const isValidAuthError = (): void => {
  throw new Error(ErrorTypes.validAuth);
};
