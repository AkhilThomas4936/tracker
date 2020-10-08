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

router.put("/status", auth, async (req, res) => {
  status = req.body.status;
  projectName = req.body.projectName;
  bugId = req.body.bugId;

  try {
    const toTheProject = await Project.findOne({
      projectName: projectName,
    });
    const toTheBug = toTheProject.bugs.filter((bug) => bug.id === bugId);
    const [bug] = toTheBug;

    bug.status = status;
    await toTheProject.save();

    res.send("Status changed");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Updating assignedTo

router.put("/assignedTo", auth, async (req, res) => {
  assignedTo = req.body.assignedTo;
  projectName = req.body.projectName;
  bugId = req.body.bugId;

  try {
    const toTheProject = await Project.findOne({
      projectName: projectName,
    });
    const toTheBug = toTheProject.bugs.filter((bug) => bug.id === bugId);
    const [bug] = toTheBug;

    bug.assignedTo = assignedTo;
    await toTheProject.save();

    res.send("assigned to changed");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
