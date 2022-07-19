const express = require('express');

const app = express();

app.use(express.json());

// Routes Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);


//middleware for errors
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);


module.exports = app;