import { Context } from "koa";

export async function getKeyStore(ctx: Context) {
  ctx.success({
    keyStore: ctx.account.keyStore,
  });
}
