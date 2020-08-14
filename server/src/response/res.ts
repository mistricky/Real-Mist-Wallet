import { ParameterizedContext, Next } from "koa";
import { IRouterParamContext } from "koa-router";
import { HTTPResponseError } from "./error";
import { ResData } from "./data";

export interface Context
  extends ParameterizedContext<any, IRouterParamContext<any, {}>> {
  success: <R = any>(data?: R) => void;
  error: (err: HTTPResponseError) => void;
}

function res(ctx: ParameterizedContext, resData: ResData, status: number) {
  ctx.status = status;
  ctx.body = resData;
}

// override context middleware
export async function overrideContext(ctx: ParameterizedContext, next: Next) {
  ctx.success = <R = any>(data?: R) =>
    res(ctx, { data: data ?? null, err: null }, 200);

  ctx.error = (err: HTTPResponseError) =>
    res(ctx, { ...err.marshal() }, err.status);

  await next();
}
