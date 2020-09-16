const router = require("express").Router();
let Projects = require("../models/projects.model");
let mail = require("../mailer");
const auth = require("./middleware/auth");
// const { check, validationResult } = require("express-validator");
const projectNameChecker = require("./middleware/projectNameChecker");

// Unauthorized route

// router.get("/", auth, (req, res) => {
//   Project.find()

//     .then((projects) => res.json(projects))
//     .catch((err) => res.status(400).json("Error" + err));
// });

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
  projectNameChecker,

  async (req, res) => {
    const projectName = req.body.projectName;
    const teamMembers = req.body.teamMembers;
    const duration = req.body.duration;

    const newProject = new Projects({
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
