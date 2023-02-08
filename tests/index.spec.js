import { test, expect } from "./playwrightEnd2EndTest";

test("server-to-server mocks", async ({
  page,
  port,
  requestInterceptor,
  rest,
}) => {
  // mock the response of the server-side request
  //   requestInterceptor.use(
  //     rest.get(`https://jsonkeeper.com/b/AFRW`, (req, res, ctx) =>
  //       res(
  //         ctx.json({
  //           title: "Lord of the Rings",
  //           imageUrl: "/lord-of-the-rings.jpg",
  //           description:
  //             "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
  //         })
  //       )
  //     )
  //   );

  await page.goto("https://37klmd-3000.preview.csb.app/");
  const name = await page.innerText("button");
  expect(name).toBe("Load data");
});
