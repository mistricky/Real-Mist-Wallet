import { Context } from "../../response/res";
import { extract } from "@wizardoc/injector";
import { Ethereum } from "../../services";
import { HTTPResponseError } from "../../response/error";
import { Auth } from "../../services/auth";

interface CreateUserPayload {
  idName: string;
  password: string;
  passwordPromptInfo: string;
}

export async function handleCreateUser(ctx: Context) {
  const ETH = extract(Ethereum);
  const { idName, password, passwordPromptInfo } = ctx.request
    .body as CreateUserPayload;
  const account = await ETH.createAccount(idName, password);

  account.setPasswordPromptInfo(passwordPromptInfo);

  try {
    await account.save();

    ctx.success({
      token: extract(Auth).signToken(idName, password),
      mnemonic: account.mnemonic,
    });
  } catch (e) {
    console.error(e);
    ctx.error(new HTTPResponseError("Create user failure", 403));
  }
}
