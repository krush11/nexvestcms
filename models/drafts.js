import mongoose from 'mongoose';
const { Schema } = mongoose;

const draftSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models && "drafts" in mongoose.models ? mongoose.models.drafts : mongoose.model('drafts', draftSchema);
