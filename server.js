const express = require("express");
const dotenv = require("dotenv");

// Connection to MongoDB
const connectDB = require("./config/db");

// initialise with express()
const app = express();

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// route using express
app.get("/", (req, res) => {
  res.send("<h1> Hello from express </h1>");
});

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    "Server running in " + process.env.NODE_ENV + " mode on port " + PORT
  )
);
