import dbConnect from "../../lib/dbConnect";
import ShortUrl from "../../models/url.model";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    try {
      const _shorturl = req.body.__shortid;
      const newURL = req.body.url;
      const thatOneURLObject = await ShortUrl.findOneAndUpdate(
        {
          shortid: _shorturl,
        },
        { url: newURL }
      );
      res.send("done");
    } catch (error) {
      console.log(error);
    }
  }
}
