export const requestInterceptor =
  typeof window === "undefined"
    ? (async () => {
        const { setupServer } = await import("msw/node");
        const { handlers } = await import("../tests/handlers");
        const requestInterceptor = setupServer(...handlers);

        requestInterceptor.listen({
          onUnhandledRequest: "warn",
        });

        return requestInterceptor;
      })()
    : undefined;

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
