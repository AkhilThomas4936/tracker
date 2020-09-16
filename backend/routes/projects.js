const router = require("express").Router();
let Project = require("../models/projects.model");
let mail = require("../mailer");
const { check, validationResult } = require("express-validator");
const projectNameChecker = require("./middleware/projectNameChecker");

router.route("/").get((req, res) => {
  Project.find()

    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error" + err));
});

//middleware functon to check the ProjectName already exists

//Creating a new project

router.post(
  "/add",

  // [check("projectName", "Project name is required").not().isEmpty()],
  projectNameChecker,

  async (req, res) => {
    const projectName = req.body.projectName;
    const teamMembers = req.body.teamMembers;
    const duration = req.body.duration;

    const newProject = new Project({
      projectName,
      teamMembers,
      duration,
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

module.exports = router;
