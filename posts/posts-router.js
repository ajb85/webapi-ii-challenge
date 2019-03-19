const express = require("express");
const db = require("../data/db.js");
const router = express.Router();

router.post("/", (req, res) => {
  if (res.body.title && res.body.contents) {
    try {
      db.insert(res.body);
      res.status(201).json(res.body);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

router.get("/", (req, res) => {
  try {
    const posts = db
      .find()
      .then(posts =>
        posts
          ? res.status(200).json(posts)
          : res
              .status(500)
              .json({ error: "There was an error retrieving the posts" })
      );
  } catch (error) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});

module.exports = router;
