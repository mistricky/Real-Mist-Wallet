import type {
  HTTPRequestInterceptor,
  AxiosRequestConfig,
} from "@wizardoc/http-request";
import { cache, JWT_TOKEN_KEY } from "../services/cache";

export class CarryToken implements HTTPRequestInterceptor {
  async onRequest(req: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const token = await cache.getItem(JWT_TOKEN_KEY);

    return {
      ...req,
      headers: {
        Authorization: token,
        ...req.headers,
      },
    };
  }
}
