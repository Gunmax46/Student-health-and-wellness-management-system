import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['mental-health', 'fitness', 'nutrition'],
    required: true
  },
  type: {
    type: String,
    enum: ['article', 'video', 'link'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbnail: String,
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

resourceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Resource = mongoose.model('Resource', resourceSchema);