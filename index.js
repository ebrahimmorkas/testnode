const express = require("express");
const app = express();
const multer = require("multer");

const upload = multer();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = req.file.originalname;
    const data = req.body;

    console.log("Uploaded file name:", fileName);
    console.log("Request body data:", data);

    res.status(200).json({ fileName, data });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Error handling file upload" });
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
