import { Context, Next } from "koa";
import { extract } from "@wizardoc/injector";
import { Ethereum } from "../services";

export async function unlock(ctx: Context, next: Next) {
  const { idName, password } = ctx.claims;
  const account = await extract(Ethereum).unlockAccount(idName, password);

  ctx.account = account;

  await next();
}
