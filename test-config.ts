require("dotenv").config();

export const debug = true; // should use staging environment in tests. your api key must match the environment i.e staging or prod
export const apiKey = process.env.API_KEY || "";
