"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/api/trpc/[trpc].ts
const next_1 = require("@trpc/server/adapters/next");
const routers_1 = require("../../../server/routers/");
const context_1 = require("../../../server/context");
// export API handler
exports.default = (0, next_1.createNextApiHandler)({
    router: routers_1.appRouter,
    createContext: context_1.createContext,
});
