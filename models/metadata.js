import mongoose from 'mongoose';

const metadataSchema = new mongoose.Schema({
  kuber: {
    type: Object,
    emails: [{
      type: String,
      unique: true,
    }]
  },
  nexvest: {
    type: Object,
    emails: [{
      type: String,
      unique: true,
    }]
  }
}, {
  timestamps: false,
  collection: 'metadata'
});

export default mongoose.models && "metadata" in mongoose.models ? mongoose.models.metadata : mongoose.model('metadata', metadataSchema);
