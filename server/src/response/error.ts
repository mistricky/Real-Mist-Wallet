import { ResData } from "./data";

export class HTTPResponseError extends Error {
  constructor(
    private msg: string,
    private _status?: number,
    private _data?: any
  ) {
    super();
  }

  get status() {
    return this._status ?? 400;
  }

  marshal(): ResData {
    return {
      data: this._data,
      err: this.msg,
    };
  }

  set data(data: any) {
    this._data = data;
  }
}
