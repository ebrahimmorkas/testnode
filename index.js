const express = require('express');
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB (adjust as needed)
    },
  });
  

app.get('/', (req, res) => {
    res.send("Home page")
})

app.post('/home', upload.single("file"), async(req, res) => {
    const data = req.body
    const fileBuffer = req.file.buffer;
    // Create the 'uploads' directory if it doesn't exist
    const uploadsDir = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadsDir, { recursive: true });

    // Save the file to the file system (if a file is provided)
    let filePath = null;
    let fileName = null;
    if (req.file) {
      fileName = req.file.originalname;
      filePath = path.join(uploadsDir, fileName);
      await fs.promises.writeFile(filePath, req.file.buffer);
    }

    console.log(data)
})

app.listen(8000, () => {
    console.log("App Listening on 8000");
})