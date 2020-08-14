import { Context } from "../../response/res";
import { extract } from "@wizardoc/injector";
import { Auth } from "../../services/auth";
import { Ethereum } from "../../services";

interface RecoverUserPayload {
  idName: string;
  password: string;
}

export async function recoverUser(ctx: Context, next: any) {
  const { idName, password } = ctx.request.body as RecoverUserPayload;

  try {
    await extract(Ethereum).unlockAccount(idName, password);

    ctx.success({ data: extract(Auth).signToken(idName) });
  } catch (e) {
    ctx.error(e);
  }
}
