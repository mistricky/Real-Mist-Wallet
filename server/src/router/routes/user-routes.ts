import type Router from "koa-router";
import { Context } from "../../response/res";
import { handleCreateUser } from "../../controllers/user/create-user";
import { recoverUser } from "../../controllers/user/recover-user";
import { getUserInfos } from "../../controllers/user/get-user-infos";
import { extract } from "@wizardoc/injector";
import { Auth } from "../../services/auth";
import { transfer } from "../../controllers/user/transfer";

export function userRoutes(router: Router<any, Context>) {
  const auth = extract(Auth);

  router
    .prefix("/user")
    .post("/", handleCreateUser)
    .put("/recover", recoverUser)
    .get("/", auth.validation, getUserInfos)
    .put("/transfer", auth.validation, transfer);
}
