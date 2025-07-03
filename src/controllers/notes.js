const Note = require('../models/note.js');
const {nanoid} = require('nanoid');

const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body, 
      slug: nanoid()
    });
    res.status(201).json(note.slug);
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
      res.status(404).json({message: "This note was not found."})

    // Note has been read already
    if(note.accessed)
      res.status(200).json({message: "This note has already been accessed."});

    // Note has expired
    const noteCreatedAt = note.createdAt.getTime();
    const currentTime = Date.now();
    const timeDiff = currentTime - noteCreatedAt;
    if(timeDiff > 6 * 60 * 60 * 1000) // If the time difference is greater than six hours
      res.status(200).json({message: "This note has self destructed!"});

    // Note has not been accessed nor expired
    note.accessed = true;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {createNote, getNote};