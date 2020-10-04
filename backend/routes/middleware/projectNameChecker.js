let Project = require("../../models/projects.model");

module.exports = async function isProjectNameUnique(req, res, next) {
  const isExists = await Project.findOne({ projectName: req.body.projectName });

  if (isExists) {
    return res.status(401).json({
      msg: "This project name is taken.Please use another one",
    });
  } else if (req.body.projectName.trim() === "") {
    return res.status(401).json({
      msg: "Please add project name",
    });
  }
  next();
};
