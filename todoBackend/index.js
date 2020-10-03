//require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const IP = process.env.IP;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

//use packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.send("This is the ROOT ROUTE");
});

//file path to routes folder for todos routes file
const todoRoutes = require("./routes/todos");
app.use("/api/todos", todoRoutes);

app.listen(PORT, function () {
  console.log(
    `App is running and listening intently on PORT ${PORT} and IP ${IP}`
  );
});
