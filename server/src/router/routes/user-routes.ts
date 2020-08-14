import Router from "koa-router";
import { Context } from "../../response/res";
import { handleCreateUser } from "../../controllers/user/create-user";
import { recoverUser } from "../../controllers/user/recover-user";

export function userRoutes(router: Router<any, Context>) {
  router.post("/user", handleCreateUser).put("/user/recover", recoverUser);
}
