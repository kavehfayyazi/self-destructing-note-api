const express = require("express");
const router = express.Router();

router.post("/post", (req, res) => {
  createNote(req.params.message)
  console.log("test");
})

router.get("/get", (req, res) => {
  getNote(req.params.url)
  console.log("test");
})

module.exports = router;