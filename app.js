const express = require("express");
require('dotenv').config(); 
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose")
const UserRoutes = require('./routes/Userroutes')
const ArticleRoutes = require('./routes/ArticleRoutes')
const cors = require('cors')
const path = require("path");


app.use(express.json({ limit: '9mb' }));
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ["http://localhost:3000", "https://meduimapi-kd3u.onrender.com"], // Allow frontend origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
const dbUrl = process.env.DB_URL;



mongoose
.connect(dbUrl)
.then(() => {
    console.log("database connection estabilished")
})
.catch((err) => {
    console.log(err.message)
})

app.get((req, res) => {
    res.send("welcome medium api")
})


app.use(UserRoutes)
app.use(ArticleRoutes)


const buildPath = path.resolve("C:/Users/User/Desktop/medium/build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });

  // Start server
  app.listen(port, (err) => {
    if (err) {
      console.log("There was a problem starting the server");
    } else {
      console.log(`Server started on port: ${port}`);
    }
  });