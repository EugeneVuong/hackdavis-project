import express from "express";

import runLangChainScript from "./langChainScript.js";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/he", (req, res) => {
  res.send("bruh");
});

app.post("/askAI", async (req, res) => {
  try {
    const { question } = req.body;
    const response = await runLangChainScript(question);
    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
