require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("Connected to Database");
  app.listen(3356, () => console.log("Server Started"));
})
.catch(() => console.log("Connection Failed"));

app.use(express.json())

const notesRouter = require("./routes/notes.js");
app.use("/notes", notesRouter);

app.get('/', (req, res) => {
  res.send("TEST");
})
