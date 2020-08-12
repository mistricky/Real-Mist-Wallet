import Router from "koa-router";
import { Context } from "../../response/res";
import { extract } from "@wizardoc/injector";
import { Ethereum } from "../../services";

export function userRoutes(router: Router<any, Context>) {
  const eth = extract(Ethereum);

  router.post("/user", (ctx) => {
    console.info(eth.createAccount());

    ctx.success("hello");
  });
}
