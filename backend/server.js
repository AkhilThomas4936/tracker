const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection made successfully");
});

const teamsRouter = require("./routes/teams");
const usersRouter = require("./routes/users");

app.use("/team", teamsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello from node express app</h1>");
});

app.listen(port, () => {
  console.log(`The app is listening at port ${port}`);
});
