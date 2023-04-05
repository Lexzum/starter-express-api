const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Routes
const scrapnews = require("./routes/scrapnews.routes.js");

const app = express();
//Cors
app.use(cors());

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", scrapnews);

module.exports = app;
