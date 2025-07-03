const express = require("express");
const router = express.Router();
const {createNote, getNote} = require('../controllers/notes.js');

router.post("/", createNote);
router.get("/:slug", getNote);

module.exports = router;