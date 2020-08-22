import "reflect-metadata";
import Koa from "koa";
import Router from "koa-router";
import { registerRoutes } from "./router";
import { Context, overrideContext } from "./response/res";
import BodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { extract } from "@wizardoc/injector";
import { DB } from "./db/connections";
import { createReadStream } from "fs";
import Path from "path";
import Static from "koa-static";

const app = new Koa<any, Context>();
const router = new Router<any, Context>();

const PUBLIC_PATH = Path.join(__dirname, "../public");

registerRoutes(router);

app.use(Static(PUBLIC_PATH));

app.use(
  cors({
    credentials: true,
  })
);
app.use(BodyParser());
app.use(overrideContext);
app.use(router.routes());

app.use((ctx) => {
  ctx.set("Content-Type", "text/html;charset=utf-8");
  ctx.body = createReadStream(Path.join(PUBLIC_PATH, "index.html"));
});

export const bootstrap = async (port: number) => {
  try {
    await extract(DB).connect();
  } catch (e) {
    console.error(
      "Cannot connect to the database, please check the config of connection.",
      e
    );

    return;
  }

  app.listen(port, () => console.info(`Listening on ${port}`));
};
