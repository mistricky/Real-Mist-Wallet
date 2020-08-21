import type Router from "koa-router";
import { Context } from "../../response/res";
import { handleCreateUser } from "../../controllers/user/create-user";
import { getUserInfos } from "../../controllers/user/get-user-infos";
import { extract } from "@wizardoc/injector";
import { Auth } from "../../services/auth";
import { transfer } from "../../controllers/user/transfer";
import { getUserPrivateKey } from "../../controllers/user/get-user-privatekey";
import { unlock } from "../../middlewares/unlock";
import { getKeyStore } from "../../controllers/user/get-keystore";
import { restoreUser } from "../../controllers/user/restore-user";

export function userRoutes(router: Router<any, Context>) {
  const auth = extract(Auth);

  router
    .prefix("/user")
    .post("/", handleCreateUser)
    .put("/transfer", auth.validation, unlock, transfer)
    .get("/", auth.validation, unlock, getUserInfos)
    .get("/private-key", auth.validation, unlock, getUserPrivateKey)
    .get("/keystore", auth.validation, unlock, getKeyStore)
    .put("/restore", restoreUser);
}
