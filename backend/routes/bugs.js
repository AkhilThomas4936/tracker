const router = require("express").Router();
let Project = require("../models/projects.model");

router.get("/", async (req, res) => {
  let result = await Project.findOne({
    projectName: req.body.projectName,
  });
  if (!result) {
    return res.status(400).json({ errors: [{ msg: "Project not found" }] });
  }
  res.send(result.bugs);
});

router.route("/add").post(async (req, res) => {
  const bugId = req.body.bugId;
  const title = req.body.title;
  const status = req.body.status;
  const createdBy = req.body.createdBy;
  const expectedResult = req.body.expectedResult;
  const actualResult = req.body.actualResult;
  const assignedTo = req.body.assignedTo;

  const newBug = {
    bugId,
    title,
    status,
    createdBy,
    expectedResult,
    actualResult,
    assignedTo,
  };
  console.log(newBug);

  try {
    let isExists = await Project.findOne({ projectName: req.body.projectName });
    if (!isExists) {
      return res.status(400).json({ errors: [{ msg: "Invalid update" }] });
    }
    await Project.updateOne(
      { projectName: req.body.projectName },
      {
        $push: { bugs: newBug },
      }
    );
    res.send("Bug pushed successfully");
  } catch (err) {
    res.status(400).json("Error:" + err);
  }
});

module.exports = router;
