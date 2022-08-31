// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";

import type { AppRouter } from "../server/routers";
import type { AppType } from "next/dist/shared/lib/utils";
//
import { createWSClient, wsLink } from "@trpc/client/links/wsLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";

import moment from "moment";

import 'moment/locale/ru'
moment.locale('ru')

import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
//
import "../styles/globals.css";
import AuthWrapper from "components/AuthWrapper";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  );
};

function getEndingLink() {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${"http://localhost:3000"}/api/trpc`,
    });
  }
  const client = createWSClient({
    url: "ws://localhost:3001",
  });
  return wsLink<AppRouter>({
    client,
  });
}

export default withTRPC<AppRouter>({
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
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(),
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers: () => {
        if (ctx?.req) {
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
