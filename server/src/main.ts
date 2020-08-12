import Koa from "koa";
import Router from "koa-router";
import { registerRoutes } from "./router";
import { Context, overrideContext } from "./response/res";

const app = new Koa<any, Context>();
const router = new Router<any, Context>();

registerRoutes(router);

app.use(overrideContext);
app.use(router.routes());

export const bootstrap = (port: number) =>
  app.listen(port, () => console.info(`Listening on ${port}`));
