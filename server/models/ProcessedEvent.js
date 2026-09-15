import mongoose from 'mongoose';
const processedEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  eventType: {
    type: String,
  },
  processedAt: {
    type: Date,
    default: Date.now,
  },
});
processedEventSchema.index(
  {
    processedAt: 1,
  },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60,
  }
);
const ProcessedEvent = mongoose.model('ProcessedEvent', processedEventSchema);
export default ProcessedEvent;
