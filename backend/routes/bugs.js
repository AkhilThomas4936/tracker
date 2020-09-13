const router = require("express").Router();
let Bug = require("../models/bug.model");

router.route("/").get((req, res) => {
  Bug.find()
    .then((bugs) => res.json(bugs))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/add").post((req, res) => {
  const projectName = req.body.projectName;
  const bugId = req.body.bugId;
  const status = req.body.status;
  const createdBy = req.body.createdBy;
  const expectedResult = req.body.expectedResult;
  const actualResult = req.body.actualResult;
  const assignedTo = req.body.assignedTo;
  const date = Date.parse(req.body.date);

  const newBug = new Bug({
    projectName,
    bugId,
    status,
    createdBy,
    expectedResult,
    actualResult,
    assignedTo,
    date,
  });

  newBug
    .save()
    .then(() => res.json(req.body))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
