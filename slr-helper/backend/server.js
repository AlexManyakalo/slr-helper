import express from "express";
import axios from "axios";
import cors from "cors";
import { CohereClientV2 } from "cohere-ai";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// URL к репозиторию
const BASE_URL =
  "https://raw.githubusercontent.com/AlexManyakalo/slr-data/gh-pages";

// Получить всех героев
app.get("/heroes", async (req, res) => {
  const response = await axios.get(`${BASE_URL}/heroes/index.json`);
  res.json(response.data);
});

// Получить все книги
app.get("/books", async (req, res) => {
  const response = await axios.get(`${BASE_URL}/books/index.json`);
  res.json(response.data);
});

// Получить конкретного героя
app.get("/hero", async (req, res) => {
  const { id } = req.body;
  const response = await axios.get(`${BASE_URL}/heroes/${id}.json`);
  res.json(response.data);
});

const cohere = new CohereClientV2({
  token: "W3m5elAJhlshWt5vl5eiozrwGkaEAPYdq4rNXQ5c",
});

app.post("/ask-cohere", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await cohere.chat({
      model: "command-r", // или ваша доступная модель
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    // Извлекаем ответ из response
    const text = response.generations[0].message.content;

    res.json({ text });
  } catch (error) {
    console.error("Ошибка запроса к Cohere:", error);
    res.status(500).json({ error: "Ошибка обращения к Cohere" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
