const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let jsonHistory = [];

app.post("/format-json", (req, res) => {
  try {
    const obj = JSON.parse(req.body.jsonText);
    const formatted = JSON.stringify(obj, null, 2);
    jsonHistory.push(formatted);
    res.json({ formatted });
  } catch (err) {
    res.status(400).json({ error: "Invalid JSON" });
  }
});

app.post("/encode", (req, res) => {
  const { text } = req.body;
  try {
    const result = Buffer.from(text).toString("base64");
    res.json({ result });
  } catch {
    res.status(400).json({ error: "Encoding failed" });
  }
});

app.post("/decode", (req, res) => {
  const { text } = req.body;
  try {
    const result = Buffer.from(text, "base64").toString("utf8");
    res.json({ result });
  } catch {
    res.status(400).json({ error: "Decoding failed" });
  }
});

app.get("/json-history", (req, res) => {
  res.json({ history: jsonHistory });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
