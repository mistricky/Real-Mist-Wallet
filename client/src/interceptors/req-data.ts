import QS from "qs";
import { ContentType } from "@wizardoc/http-request";

import type {
  HTTPRequestInterceptor,
  AxiosRequestConfig,
} from "@wizardoc/http-request";

export class ReqData implements HTTPRequestInterceptor {
  onRequest(
    req: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    console.info(req);

    const dup = { ...req };
    const { data } = dup;
    const contentType = req.headers["Content-Type"];

    // parse request body use QS
    if (contentType === ContentType.Form) {
      dup.data = QS.stringify(data);
    }

    dup.withCredentials = true;

    return dup;
  }
}
