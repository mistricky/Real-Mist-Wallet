import { ArrowCache } from "arrow-cache";

export const JWT_TOKEN_KEY = "token";
export const USER_INFO_KEY = "userInfo";

export const cache = new ArrowCache({
  isPermanentMemory: true,
});
