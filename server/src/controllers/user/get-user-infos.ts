import { Context } from "koa";
import { extract } from "@wizardoc/injector";
import { Ethereum } from "../../services";

export async function getUserInfos(ctx: Context) {
  const { idName } = ctx.claims;
  const { password } = ctx.request.query;
  const account = await extract(Ethereum).unlockAccount(idName, password);
  const balance = await account.getBalance();

  ctx.success({
    idName,
    balance,
    privateKey: account.privateKey,
    address: account.address,
    keyStore: account.keyStore,
  });
}
