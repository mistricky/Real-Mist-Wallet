"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.bootstrap = void 0;
var koa_1 = __importDefault(require("koa"));
var koa = new koa_1["default"]();
exports.bootstrap = function (port) {
    return koa.listen(port, function () { return console.info("Listening on " + port); });
};
