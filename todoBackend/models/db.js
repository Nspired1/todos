const mongoose = require("mongoose");
const config = require("config");
const dbLink = config.get("mongoURI");
//"debug", true is more explicit error logging for development, otherwise set to false
mongoose.set("debug", true);
mongoose
  .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!!");
  })
  .catch((err) => {
    console.log("Error!", err.message);
  });

//allows use of Promise syntax
//mongoose.Promise = Promise;

module.exports.Todo = require("./todoSchema");
