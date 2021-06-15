const { rest } = require("msw");

// These are the request handlers that will be applied during production builds.
// This is the place to mock fetch requests inside of getStaticProps.
module.exports = [
  rest.get(`https://jsonkeeper.com/b/AFRW`, (req, res, ctx) =>
    res(
      ctx.json({
        title: "Harry Potter",
        imageUrl: "/harry-potter.jpg",
        description:
          "This wonderful book takes us on a magical journey you can't help falling in love with.",
      })
    )
  ),
];
