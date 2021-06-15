// This route enables/disables preview mode for our Playwright tests
export default function handler(req, res) {
  if (process.env.PLAYWRIGHT) {
    if (Object.prototype.hasOwnProperty.call(req.query, "clear")) {
      // turn off preview mode when testing completes
      res.clearPreviewData();
    } else {
      // turn on preview mode when testing in playwright
      res.setPreviewData({ playwright: true });
    }
  }
  res.end();
}
