/**
 * Note controller handlers
 * @module controllers/notes
 */

const Note = require('../models/note.js');
const {nanoid} = require('nanoid');

/**
 * Creates a new Note document in MongoDB using the payload from the request body,
 * assigns it a unique slug via nanoid, and responds with the slug.
 * 
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {{message: string}} req.body - The data for the new Note
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 *  - On success: sends HTTP 201 and JSON `{slug: string}`.
 *  - On failure: sends HTTP 500 and JSON `{message: string}` with the error.
 */
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

/**
 * Searches MongoDB for the URL parameter, finds the Note and responds
 * with the self-destructing logic. 
 * 
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {{slug: string}} req.params - The "slug" URL parameter.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 *  - If the Note was not found: sends HTTP 404 and JSON `{message: string}`.
 *  - If the Note was already accessed: sends HTTP 200 and JSON `{message: string}`.
 *  - If the Note had expired: sends HTTP 200 and JSON `{message: string}`.
 *  - If the Note is accessible: sends HTTP 200 and JSON containing the Note document.
 *  - On failure: sends HTTP 500 and JSON `{message: string}` with the error.
 */
const getNote = async (req, res) => {
  try {
    const slug = req.params.slug;
    const note = await Note.findOne({slug}); // Each slug is unique

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