import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema decleration
const ShortUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

export default mongoose.models.ShortUrl ||
  mongoose.model("ShortUrl", ShortUrlSchema);
