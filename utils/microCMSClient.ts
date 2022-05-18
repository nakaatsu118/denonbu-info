import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.microCMSServiceDomain || '',
  apiKey: process.env.microCMSApiKey || '',
});
