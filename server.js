const express = require("express");
const fileUpload = require("express-fileupload");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.post("/analyze", (req, res) => {
  if (!req.files || !req.files.media) {
    return res.status(400).send({ error: "No file uploaded" });
  }

  const file = req.files.media;
  const uploadPath = path.join(__dirname, file.name);
  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    exec(`python analyze.py "${uploadPath}"`, (error, stdout) => {
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      res.send({ result: stdout.trim() });
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
