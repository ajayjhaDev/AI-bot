const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

dotenv.config();

const configuration = new GoogleGenerativeAI(process.env.API_KEY);

const modelId = "gemini-pro";

const model = configuration.getGenerativeModel({
  model: modelId,
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateResponse(req, res) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const { prompt } = req.body;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  res.send({ response: text });
}

app.post("/generate", generateResponse);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
