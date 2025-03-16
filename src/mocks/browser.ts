import { setupWorker } from "msw/browser";
import { handlers } from "./mockApi.ts";

export const worker = setupWorker(...handlers);
