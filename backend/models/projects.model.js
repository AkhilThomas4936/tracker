const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bugSchema = new Schema({
  bugId: { type: Number },
  title: { type: String, required: true },
  status: { type: String, required: true },
  createdBy: { type: String },
  expectedResult: { type: String },
  actualResult: { type: String },
  assignedTo: { type: String, required: true },
  comments: { type: Array },
  date: { type: Date, default: Date.now },
});

const projectSchema = new Schema({
  projectName: { type: String, rquired: true, unique: true, trim: true },
  teamMembers: { type: Array },
  duration: { type: String },

  bugs: [bugSchema],
  date: { type: Date, default: Date.now },
});

projectSchema.index({ teamMembers: "text" });
projectSchema.index({ projectName: 1 });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
