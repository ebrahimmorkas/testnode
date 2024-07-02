const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB (adjust as needed)
  },
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello")
})

app.post('/', upload.single("file"), async (req, res) => {
  const data = req.body;
  
  const fileBuffer = req.file.buffer;
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
  console.log("HELLOHELLOHELLOHELLOHELLO")
  console.log(fileName)
  console.log(data);

  res.send(data);
})

app.listen(8080, () => {
  console.log("Listening on port 8080");
})