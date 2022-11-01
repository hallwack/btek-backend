require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("node:path");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(
  "/assets/upload",
  express.static(path.join(__dirname, "assets", "upload"))
);

app.use("/", require("./src/routes"));

app.listen(8888, () => {
  console.log("App listen on port 8888");
});
