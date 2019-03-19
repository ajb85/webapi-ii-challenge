const express = require("express");
const db = require("../data/db.js");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(req.body)
      .then(success => {
        success
          ? res.status(201).json(req.body)
          : res
              .status(500)
              .json({
                error:
                  "Oops, the request was good but something went wrong internally.  Try again!"
              });
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." })
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
