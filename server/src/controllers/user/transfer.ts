import { extract } from "@wizardoc/injector";
import { Ethereum, TransferPayload } from "../../services";
import { Context } from "koa";
import { HTTPResponseError } from "../../response/error";

export async function transfer(ctx: Context) {
  const { idName } = ctx.claims;

  try {
    const receipt = await extract(Ethereum).sendTX(
      idName,
      ctx.request.body as TransferPayload
    );

    ctx.success({ receipt });
  } catch (e) {
    ctx.error(new HTTPResponseError(e));
  }
}
