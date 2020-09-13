const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    projectName: { type: String, required: true },
    bugId: { type: Number, required: true },
    status: { type: String, required: true },
    createdBy: { type: String, required: true },
    expectedResult: { type: String, required: true },
    actualResult: { type: String, required: true },
    assignedTo: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;
