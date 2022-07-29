const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const port = config.get("port") || 3000;
var cors = require("cors");

app.use(cors());

app.use(express.json({ extended: true }));
app.use('/api/auth',require('./routes/auth.routes') )
app.use('/api',require('./routes/newOrder') )

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {useNewUrlParser: true, });
    app.listen(port, () =>console.log("app has been started.... on port  ", port));
  } catch {
    console.log("server error", Error.message);
    process.exit(1);
  }
}

start();
