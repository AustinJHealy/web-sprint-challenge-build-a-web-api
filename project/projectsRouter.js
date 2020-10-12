const express = require("express");
const router = express.Router();
const projects = require("../data/helpers/projectModel.js");

router.get("/", (req, res) => {
  projects
    .get()
    .then((success) => {
      res.status(200).json({ success });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ message: "Error retrieving project" });
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(500).json({ message: "Please provide name and description" });
  } else {
    projects
      .insert(req.body)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Unable to add project" });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id || !changes) {
    res.status(500).json({ message: "ID and changes are required" });
  } else {
    projects
      .update(id, changes)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Error 404, User not found" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Please provide an ID" });
  } else {
    projects
      .remove(id)
      .then((success) => {
        res.status(200).json({ message: "User successfully deleted", success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Unable to delete project" });
      });
  }
});

router.get("/projectActions", (req, res) => {
  const { project_id } = req.body;
  console.log(project_id);
  if (!project_id) {
    res.status(500).json({ message: "Please provide ID" });
  } else {
    projects
      .getProjectActions(project_id)
      .then((success) => {
        res.status(200).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Error 404" });
      });
  }
});

module.exports = router;
