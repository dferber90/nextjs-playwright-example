import { rest } from "msw";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handlers = [
  rest.get(`${API_DOMAIN}/*`, (req, res, ctx) =>
    res(
      ctx.json({
        id: 123,
        isMock: true,
      })
    )
  ),
];
