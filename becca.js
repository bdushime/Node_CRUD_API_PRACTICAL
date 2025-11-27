const express = require("express");
const app = express();


function responseTimeLogger(req, res, next) {
  const start = Date.now(); 

  
  res.on("finish", () => {
    const end = Date.now(); 
    const timeTaken = end - start;
    console.log(`${req.method} ${req.originalUrl} took ${timeTaken} ms`);
  });

  next(); 


app.use(responseTimeLogger);


app.get("/", (req, res) => {
  res.send("Home route");
});

app.get("/users", (req, res) => {
  setTimeout(() => {           
    res.send("Users route");
  }, 500);
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});