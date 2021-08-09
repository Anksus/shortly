import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortid: {
    type: String,
    required: true,
  },
});

export default mongoose.models.ShortUrl ||
  mongoose.model("ShortUrl", ShortUrlSchema);