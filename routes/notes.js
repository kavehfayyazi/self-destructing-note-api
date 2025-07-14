/**
 * Notes router
 * @module routes/notes
 */

const express = require("express");
const router = express.Router();
const {createNote, getNote} = require('../controllers/notes.js');

// POST /notes       ->  create a new Note
router.post("/", createNote);

// GET /notes/:slug  ->  retrieve (and self-destruct) a Note
router.get("/:slug", getNote);

module.exports = router;