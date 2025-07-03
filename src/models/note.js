const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  user: {
    type: String,
    trim: true
  },
  message: {
    type: String, 
    required: true,
    trim: true
  },
  slug: 
  {
    type: String, 
    required: true,
    unique: true 
  },
  accessed: {
    type: Boolean, 
    default: false
  },
  createdAt: {
    type: Date, 
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);