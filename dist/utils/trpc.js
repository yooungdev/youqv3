"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpc = void 0;
const react_1 = require("@trpc/react");
// import superjson from 'superjson';
// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
exports.trpc = (0, react_1.createReactQueryHooks)();
