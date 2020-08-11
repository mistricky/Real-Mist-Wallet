import Koa from "koa";
import Router from "koa-router";

const koa = new Koa();

export const bootstrap = (port: number) =>
  koa.listen(port, () => console.info(`Listening on ${port}`));
