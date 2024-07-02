const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello")
})

app.post('/', (req, res) => {
  const data = req.body;
  console.log("HELLOHELLOHELLOHELLOHELLO")
  console.log(data);
  res.send(data);
})

app.listen(8080, () => {
  console.log("Listening on port 8080");
})