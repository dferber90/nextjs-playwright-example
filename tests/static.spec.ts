import { expect } from "@playwright/test";
import test from "./next-fixture";

// Here is an overview over which book is returned where
//
// Actual getStaticProps:
//    The Intelligent Investor
//
// Mocking at build time (in production-build-request-handlers.js):
//    Harry Potter
//
// Mocking during tests (in this file):
//    Lord of the Rings

test("show that the mocking at build time works", async ({ page, port }) => {
  await page.goto(`http://localhost:${port}/static`);
  const name = await page.innerText("h1");
  expect(name).toBe("Harry Potter");
});

test("show that the mocking at test time works", async ({
  page,
  port,
  requestInterceptor,
  rest,
  enablePreviewMode,
}) => {
  // mock the response of getStaticProps' request
  requestInterceptor.use(
    rest.get(`https://jsonkeeper.com/b/AFRW`, (req, res, ctx) =>
      res(
        ctx.json({
          title: "Lord of the Rings",
          imageUrl: "/lord-of-the-rings.jpg",
          description:
            "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
        })
      )
    )
  );

  await enablePreviewMode(page);

  await page.goto(`http://localhost:${port}/static`);
  const name = await page.innerText("h1");
  expect(name).toBe("Lord of the Rings");
});

test("show that preview mode can be disabled during a test", async ({
  page,
  port,
  requestInterceptor,
  enablePreviewMode,
  rest,
}) => {
  // mock the response of the static request
  requestInterceptor.use(
    rest.get(`https://jsonkeeper.com/b/AFRW`, (req, res, ctx) =>
      res(
        ctx.json({
          title: "Lord of the Rings",
          imageUrl: "/lord-of-the-rings.jpg",
          description:
            "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
        })
      )
    )
  );

  // Enable preview mode so getStaticProps is executed on every request
  // This leads to the mock above getting loaded.
  const disablePreviewMode = await enablePreviewMode(page);

  await page.goto(`http://localhost:${port}/static`);
  const nameWhenMockedAtTestTime = await page.innerText("h1");
  expect(nameWhenMockedAtTestTime).toBe("Lord of the Rings");

  // We now disable preview mode again, so the page load will return the
  // site as it was generated at build time, where it used the Harry Potter book
  await disablePreviewMode();

  await page.goto(`http://localhost:${port}/static`);
  const nameWhenMockedAtBuildTime = await page.innerText("h1");
  expect(nameWhenMockedAtBuildTime).toBe("Harry Potter");
});
