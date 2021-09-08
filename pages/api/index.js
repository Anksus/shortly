import dbConnect from "../../lib/dbConnect";
import ShortUrl from "../../models/url.model";
import ShortID from "shortid";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        res.status(200).json({ success: true, data: "no" });
      } catch (error) {
        res.status(402).json({ success: false });
      }
      break;
    case "POST":
      try {
        const URL = req.body.url;
        const email = req.body.email;
        if (!URL) {
          throw new Error("No URL!");
        }
        const urlExists = await ShortUrl.findOne({ url: URL });
        if (urlExists) {
          const newURL = "https://sh.anksus.me/api/" + urlExists.shortid;
          res.status(200).json({ success: true, data: newURL });
          return;
        }
        const newShortUrl = new ShortUrl({
          url: URL,
          shortid: ShortID.generate(),
          email: email,
        });

        const result = await newShortUrl.save();
        const newURL = "https://sh.anksus.me/api/" + result.shortid;
        res.status(200).json({ success: true, data: newURL });
      } catch (error) {
        res.status(405).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
