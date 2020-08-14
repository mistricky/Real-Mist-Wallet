import { Injectable } from "@wizardoc/injector";
import JWT, { Secret } from "jsonwebtoken";
import { HTTPResponseError } from "../response/error";

const SECRET_KEY: Secret = "foo_secret_key";

export interface JWTPayload {
  idName: string;
}

@Injectable()
export class Auth {
  signToken(idName: string): string {
    return JWT.sign({ idName }, SECRET_KEY);
  }

  verify(token: string): boolean | never {
    try {
      JWT.verify(token, SECRET_KEY);
    } catch (e) {
      throw new HTTPResponseError(e);
    }

    return true;
  }
}
