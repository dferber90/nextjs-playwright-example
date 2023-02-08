import { test as base, expect } from "@playwright/test";
import { createWorkerFixture } from "playwright-msw";
import { handlers } from "./handlers";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import path from "path";
import { rest } from "msw";

const test = base.extend({
  worker: createWorkerFixture(handlers),

  port: [
    async ({}, use) => {
      const app = next({
        dev: false,
        dir: path.resolve(__dirname, ".."),
      });

      await app.prepare();
      const handle = app.getRequestHandler();

      const server = await new Promise((resolve) => {
        const server = createServer((req, res) => {
          const parsedUrl = parse(req.url, true);
          handle(req, res, parsedUrl);
        });

        server.listen((error) => {
          if (error) throw error;
          resolve(server);
        });
      });

      const port = String(server.address().port);
      await use(port);
    },
    {
      scope: "worker",
      auto: true,
    },
  ],
  requestInterceptor: [
    async ({}, use) => {
      const { requestInterceptor } = await import("../.next/server/pages/_app");
      await use(requestInterceptor);
    },
    {
      scope: "worker",
    },
  ],

  rest,
});

export { test, expect };
