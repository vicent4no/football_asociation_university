import { setupWorker } from "msw/browser";
import apiMockHandlers from "./apiMockHandlers.ts";

const apiMock = setupWorker(...apiMockHandlers);

export default apiMock;
