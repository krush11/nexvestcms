import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
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
  },
  stats: {
    type: Object,
    totalViews: Number,
    viewHistory: [[Number]],
    default: {
      totalViews: 0,
      viewHistory: Array.from({ length: 12 }, () => Array.from({ length: 31 }, () => 0)),
    }
  }
}, { timestamps: true });

export default mongoose.models && "posts" in mongoose.models ? mongoose.models.posts : mongoose.model('posts', postSchema);
