const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const routeNavigator = require("./src/index");

const server = app.listen(8080, "0.0.0.0", function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`You're connected at ${host}:${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", routeNavigator);
app.use(cors());
