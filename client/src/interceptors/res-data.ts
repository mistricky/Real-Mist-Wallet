import type {
  HTTPResponseInterceptor,
  AxiosResponse,
} from "@wizardoc/http-request";

export class ResData implements HTTPResponseInterceptor {
  onResponse(
    res: AxiosResponse<any>
  ): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    return res.data.data;
  }
}
