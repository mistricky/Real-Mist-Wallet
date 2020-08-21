import { Context } from "koa";

export async function getUserPrivateKey(ctx: Context) {
  ctx.success({
    privateKey: ctx.account.privateKey,
  });
}
