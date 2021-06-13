// This is used by next-fixutre.ts to pass requestInterceptor to each test,
// where it can be used to set up the server-side request mocks.
export const requestInterceptor =
  process.env.PLAYWRIGHT === "1" && typeof window === "undefined"
    ? (() => {
        const { setupServer } = require("msw/node");
        const requestInterceptor = setupServer();
        requestInterceptor.listen({
          // silence warnings when actual requests are made
          // https://github.com/mswjs/msw/issues/191#issuecomment-652292341
          onUnhandledRequest: "bypass",
        });
        return requestInterceptor;
      })()
    : undefined;

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
