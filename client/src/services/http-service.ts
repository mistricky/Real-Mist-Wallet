import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  AxiosError,
} from "@wizardoc/http-request";
import { Injectable, extract } from "@wizardoc/injector";
import ServerConfig from "../configs/server-config.json";
import { ReqData } from "../interceptors/req-data";
import { CarryToken } from "../interceptors/carry-token";
import { ResData } from "../interceptors/res-data";

@Injectable()
export class HTTPServiceFactory extends HTTPRequestFactory
  implements HTTPConfigure {
  errorInteract(
    errMsg: string | import("@wizardoc/http-request").ErrorOperates,
    err: AxiosError<any>
  ): void {
    console.info(err);
    // throw new Error("Method not implemented.");
  }
  configure(consume: IConfigure): void {
    consume.serverConfigure.setConfig(ServerConfig);
    consume.interceptor.use([ReqData, CarryToken, ResData]);
  }
}

export const httpService = extract(HTTPServiceFactory).create();
