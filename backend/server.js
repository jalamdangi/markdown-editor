const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { marked } = require("marked");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) return res.status(400).json({ error: "Markdown input is required" });
  try {
    const html = marked(markdown);
    res.json({ html });
  } catch (error) {
    res.status(500).json({ error: "Error processing Markdown" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
