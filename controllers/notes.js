const Note = require('../models/note.js');
const {nanoid} = require('nanoid');

const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body, 
      slug: nanoid()
    });
    res.status(201).json({slug: note.slug});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getNote = async (req, res) => {
  try {
    const slug = req.params.slug;
    const note = await Note.findOne({slug}); // Slug is unique

    // Note is not found
    if(!note)
      return res.status(404).json({message: "This note was not found."})

    // Note has been read already
    if(note.accessed)
      return res.status(200).json({message: "This note has already been accessed."});

    // Note has expired
    const createdAt = note.createdAt.getTime();
    const age = Date.now() - createdAt;
    const SIX_HOURS = 6 * 60 * 60 * 1000
    if(age > SIX_HOURS)
      return res.status(200).json({message: "This note has self destructed!"});

    // Note has not been accessed nor expired
    note.accessed = true;
    await note.save();
    
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {createNote, getNote};