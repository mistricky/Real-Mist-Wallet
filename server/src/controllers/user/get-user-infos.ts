import { Context } from "koa";
import { extract } from "@wizardoc/injector";
import { Ethereum } from "../../services";

export async function getUserInfos(ctx: Context) {
  const { idName, password } = ctx.claims;
  const account = await extract(Ethereum).unlockAccount(idName, password);
  const balance = await account.getBalance();

  ctx.success({
    idName,
    balance,
    address: account.address,
  });
}
