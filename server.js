require('dotenv').config()

const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(cors());
app.use(express.json())

// routes
const notesRouter = require("./routes/notes.js");
app.use("/notes", notesRouter);

// health check
app.get('/', (req, res) => {res.send("TEST");})

// database and server startup
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(3356, () => console.log("Server Started"));
  })
  .catch(() => console.log("Connection Failed"));