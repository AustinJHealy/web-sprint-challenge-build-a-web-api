const express = require("express");
const router = express.Router();
const userActions = require("../data/helpers/actionModel");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Must have a valid ID" });
  } else {
    userActions
      .get(id)
      .then((success) => {
        res.status(200).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Error 404" });
      });
  }
});

router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(500).json({ message: "Please input ID, description and notes" });
  } else if (description.length >= 128) {
    res.status(500).json({ message: "Must be less than 128 characters" });
  } else {
    userActions
      .insert(req.body)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Error 404" });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id) {
    res.status(500).json({ message: "Must provide ID" });
  } else {
    userActions
      .update(id, changes)
      .then((success) => {
        res.status(200).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Error 404" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Please provide ID" });
  } else {
    actions
      .remove(id)
      .then((success) => {
        res.status(200).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Unable to delete resource" });
      });
  }
});

module.exports = router;
