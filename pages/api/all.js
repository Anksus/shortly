import dbConnect from "../../lib/dbConnect";
import ShortUrl from "../../models/url.model";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    try {
      const email = req.body.email;
      const allStuff = await ShortUrl.find({ email });
      if (!allStuff) {
        res.status(404).json({ success: false, msg: "URL doesn't exist." });
      }
      res.send(allStuff);
    } catch (error) {
      console.log(error);
    }
  }
}
