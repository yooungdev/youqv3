"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/_app.tsx
const next_1 = require("@trpc/next");
//
const wsLink_1 = require("@trpc/client/links/wsLink");
const httpBatchLink_1 = require("@trpc/client/links/httpBatchLink");
const loggerLink_1 = require("@trpc/client/links/loggerLink");
const moment_1 = __importDefault(require("moment"));
require("moment/locale/ru");
moment_1.default.locale('ru');
const superjson_1 = __importDefault(require("superjson"));
const react_1 = require("next-auth/react");
//
require("../styles/globals.css");
const AuthWrapper_1 = __importDefault(require("components/AuthWrapper"));
const MyApp = ({ Component, pageProps: { session, ...pageProps }, }) => {
    return (<react_1.SessionProvider session={session}>
      <AuthWrapper_1.default>
        <Component {...pageProps}/>
      </AuthWrapper_1.default>
    </react_1.SessionProvider>);
};
function getEndingLink() {
    if (typeof window === "undefined") {
        return (0, httpBatchLink_1.httpBatchLink)({
            url: `${"http://localhost:3000"}/api/trpc`,
        });
    }
    const client = (0, wsLink_1.createWSClient)({
        url: "ws://localhost:3001",
    });
    return (0, wsLink_1.wsLink)({
        client,
    });
}
exports.default = (0, next_1.withTRPC)({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        return {
            /**
             * @link https://trpc.io/docs/links
             */
            links: [
                // adds pretty logs to your console in development and logs errors in production
                (0, loggerLink_1.loggerLink)({
                    enabled: (opts) => (process.env.NODE_ENV === "development" &&
                        typeof window !== "undefined") ||
                        (opts.direction === "down" && opts.result instanceof Error),
                }),
                getEndingLink(),
            ],
            /**
             * @link https://trpc.io/docs/data-transformers
             */
            transformer: superjson_1.default,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
            headers: () => {
                if (ctx === null || ctx === void 0 ? void 0 : ctx.req) {
                    // on ssr, forward client's headers to the server
                    return {
                        ...ctx.req.headers,
                        "x-ssr": "1",
                    };
                }
                return {};
            },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: true,
})(MyApp);
