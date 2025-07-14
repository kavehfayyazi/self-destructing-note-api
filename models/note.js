/**
 * Note model
 * @module models/note
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Note
 * @property {string} [user]        - Optional user identifier
 * @property {string} message       - The message of the note (required)
 * @property {string} slug          - Unique slug for note identification (required)
 * @property {boolean} [accessed]    - Whether it's already been read (defaults to false)
 * @property {Date} [createdAt]   - When it was created (defaults to now)
 */

const noteSchema = mongoose.Schema({
  user:       {type: String,  trim: true},
  message:    {type: String,  required: true, trim: true},
  slug:       {type: String,  required: true, unique: true },
  accessed:   {type: Boolean, default: false},
  createdAt:  {type: Date,    required: true, default: Date.now}
});

const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel