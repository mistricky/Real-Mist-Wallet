import Router from "koa-router";
import * as routes from "./routes";

type Routes = {
  [name: string]: (router: Router) => void;
};

export function registerRoutes(router: Router) {
  for (const name of Object.keys(routes)) {
    (routes as Routes)[name](router);
  }
}
