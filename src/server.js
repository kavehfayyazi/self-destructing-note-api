const express = require('express');
const app = express();

const notesRouter = require("./routes/notes.js");
app.use("/notes", notesRouter);

app.listen(3356);