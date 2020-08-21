import { Context } from "koa";
import { extract } from "@wizardoc/injector";
import { Ethereum } from "../../services";
import { HTTPResponseError } from "../../response/error";
import { Auth } from "../../services/auth";

interface RestoreUserPayload {
  mnemonic: string;
  idName: string;
  password: string;
  passwordPromptInfo: string;
}

export async function restoreUser(ctx: Context) {
  const ETH = extract(Ethereum);
  const { mnemonic, idName, password, passwordPromptInfo } = ctx.request
    .body as RestoreUserPayload;
  const auth = extract(Auth);
  const account = await ETH.restoreAccount(idName, password, mnemonic);

  account.setPasswordPromptInfo(passwordPromptInfo);

  try {
    await account.save();

    ctx.success({
      token: auth.signToken(idName, password),
    });
  } catch (e) {
    ctx.error(new HTTPResponseError(e));
  }
}
