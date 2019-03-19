const express = require("express");
const db = require("../data/db.js");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(req.body)
      .then(success => {
        res.status(201).json(req.body);
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." })
      );
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
