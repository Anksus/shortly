import dbConnect from "../../lib/dbConnect";
import ShortUrl from "../../models/url.model";
import ShortID from "shortid";

export default async function handler(req, res) {
  await dbConnect();
  const reqUrl = req.query.slug;
  // console.log(reqUrl);
  const { method } = req;
  if (method === "GET") {
    try {
      if (!reqUrl) {
        res.status(404).json({ success: false, msg: "URL doesn't exist." });
      }
      const urlExist = await ShortUrl.findOne({ shortid: reqUrl });
      if (!urlExist) {
        res.status(404).json({ success: false, msg: "URL doesn't exist." });
      }
      res.redirect(urlExist.url);
    } catch (error) {
      console.log(error);
    }
  }
}
