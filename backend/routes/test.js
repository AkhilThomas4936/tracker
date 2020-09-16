const router = require("express").Router();

const Projects = require("../models/projects.model");

router.route("/").get(async (req, res) => {
  const userEmail = req.body.userEmail;
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

module.exports = router;
