import { Injectable } from "@wizardoc/injector";
import JWT from "jsonwebtoken";
import { HTTPResponseError } from "../response/error";
import { Next, Context } from "koa";

const SECRET_KEY = "foo_secret_key";
const AUTH_HEADER = "authorization";

export interface JWTPayload {
  idName: string;
}

@Injectable()
export class Auth {
  signToken(idName: string, password: string): string {
    return JWT.sign({ idName, password }, SECRET_KEY);
  }

  verify(token: string) {
    try {
      JWT.verify(token, SECRET_KEY);
    } catch (e) {
      throw new HTTPResponseError("Authorization Failure");
    }
  }

  // validation middleware
  validation = async (ctx: Context, next: Next) => {
    const token = ctx.request.header[AUTH_HEADER];

    try {
      this.verify(token);
    } catch (e) {
      ctx.error(e);
      return;
    }

    ctx.claims = JWT.decode(token);

    await next();
  };
}
