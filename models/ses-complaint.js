import mongoose from "mongoose";

const sesComplaintSchema = new mongoose.Schema({
  messageId: String,
  complaint: Object,
  mail: Object,
});

export default mongoose.models && "ses-complaint" in mongoose.models ? mongoose.models.sesComplaint : mongoose.model("ses-complaint", sesComplaintSchema);