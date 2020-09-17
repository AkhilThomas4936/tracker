const router = require("express").Router();
const Projects = require("../models/projects.model");
let mail = require("../mailer");
const auth = require("./middleware/auth");
// const { check, validationResult } = require("express-validator");
const projectNameChecker = require("./middleware/projectNameChecker");
// const Project = require("../models/projects.model");

//Authorized route for projects
router.get("/", auth, async (req, res) => {
  const userEmail = req.user.email;
  console.log(userEmail);
  try {
    let test = await Projects.find({
      teamMembers: `${userEmail}`,
    });

    //if the user is not included in any projects

    if (test.length === 0) {
      return res.send(
        "You are not a member of any Project! Create a new project"
      );
    }
    if (!test) {
      return res.status(400).json({ errors: [{ msg: "Invalid text search" }] });
    }
    res.send(test);
  } catch (err) {
    res.status(400).json("Error:" + err);
  }
});

//Creating a new project

router.post(
  "/add",

  // [check("projectName", "Project name is required").not().isEmpty()],
  [auth, projectNameChecker],

  async (req, res) => {
    const projectName = req.body.projectName;
    const teamMembers = req.body.teamMembers;
    const duration = req.body.duration;
    const createdBy = req.user.email;

    const newProject = new Projects({
      projectName,
      teamMembers,
      duration,
      createdBy,
    });

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      await newProject.save();
      await mail(teamMembers);

      res.send("Project added successfully");
    } catch (err) {
      res.status(400).json("Error:" + err);
    }
  }
);

//Deleting project

router.delete("/delete/:projectName", auth, async (req, res) => {
  try {
    await Projects.findOneAndRemove({
      projectName: req.params.projectName,
    });
    res.send("Project Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
