const router = require("express").Router();
let Team = require("../models/team.model");
let mail = require("../mailer");

router.route("/").get((req, res) => {
  Team.find()
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/add").post((req, res) => {
  const projectName = req.body.projectName;
  const teamMembers = req.body.teamMembers;
  const duration = req.body.duration;
  const date = Date.parse(req.body.date);

  const newTeam = new Team({
    projectName,
    teamMembers,
    duration,
    date,
  });

  newTeam
    .save()
    .then(mail(teamMembers))
    .then(() => res.json(req.body.teamMembers))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
