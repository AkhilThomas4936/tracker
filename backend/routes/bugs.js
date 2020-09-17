const router = require("express").Router();
let Project = require("../models/projects.model");
const auth = require("./middleware/auth");

router.get("/", async (req, res) => {
  let result = await Project.findOne({
    projectName: req.body.projectName,
  });
  if (!result) {
    return res.status(400).json({ errors: [{ msg: "Project not found" }] });
  }
  res.send(result.bugs);
});

router.post("/add", auth, async (req, res) => {
  const title = req.body.title;
  const status = req.body.status;
  const createdBy = req.user.email;
  const expectedResult = req.body.expectedResult;
  const actualResult = req.body.actualResult;
  const assignedTo = req.body.assignedTo;
  const comments = req.body.comments;

  const newBug = {
    title,
    status,
    createdBy,
    expectedResult,
    actualResult,
    assignedTo,
    comments,
  };

  try {
    let isExists = await Project.findOne({ projectName: req.body.projectName });
    if (!isExists) {
      return res.status(400).json({ errors: [{ msg: "Invalid update" }] });
    }
    const toProject = await Project.findOne({
      projectName: req.body.projectName,
    });
    toProject.bugs.unshift(newBug);
    await toProject.save();
    res.send("Bug added successfully");
  } catch (err) {
    res.status(400).json("Error:" + err);
  }
});

//To add more comments

router.put("/comments/:projectName/:bugId", auth, async (req, res) => {
  newComment = req.body.comment;

  try {
    const toTheProject = await Project.findOne({
      projectName: req.params.projectName,
    });
    const toTheBug = toTheProject.bugs.filter(
      (bug) => bug.id === req.params.bugId
    );
    const [bug] = toTheBug;

    bug.comments.unshift(newComment);
    await toTheProject.save();

    res.send("New comment added successfully");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
