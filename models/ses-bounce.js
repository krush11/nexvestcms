import mongoose from "mongoose";

const sesBounceSchema = new mongoose.Schema({
  messageId: String,
  bounce: Object,
  mail: Object,
});

export default mongoose.models && "ses-bounce" in mongoose.models ? mongoose.models.sesBounce : mongoose.model("ses-bounce", sesBounceSchema);