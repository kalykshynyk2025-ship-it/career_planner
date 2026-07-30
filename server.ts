import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API route for Career Coach AI assistant
app.post("/api/career/coach", async (req, res) => {
  try {
    const { stepIndex, stepName, userPrompt, state, action } = req.body;

    const ai = getAi();

    const systemInstruction = `
Ты — Senior Software Engineer, Product Manager, Business Analyst и Career Coach.
Твоя задача — вести пользователя по методологии Agile для проектирования его карьерного трека (проекта "Career Planner").

ПРАВИЛА И СТИЛЬ:
- Оформляй результаты в чистый Markdown, идеально подходящий для Notion (таблицы, чек-листы, callout-блоки, списки).
- Итипации Agile: никогда не пытайся выполнить все шаги разом. Работай строго над текущим шагом (${stepName || 'Шаг ' + stepIndex}).
- Будь конкретным, профессиональным, не придумывай неверные факты. Если вариантов несколько — предлагай варианты с плюсами и минусами в таблице.
- В конце ответа О Mandatory добавляй блок:
  ✔ **Что сделано**
  ❓ **Что осталось уточнить**
  ➡ **Следующий этап**

ТЕКУЩЕЕ СОСТОЯНИЕ ПРОЕКТА (STATE):
${JSON.stringify(state, null, 2)}
`;

    const prompt = `
Текущий этап: ${stepName} (Шаг #${stepIndex})
Действие/Запрос пользователя: ${userPrompt || 'Сгенерируй детальный анализ для этого этапа'}
Контекст действия: ${action || 'general'}

Пожалуйста, сформулируй профессиональный разбор для этого этапа с Notion-Markdown оформлением.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text || "Не удалось сгенерировать ответ.",
    });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({
      error: error.message || "Ошибка обработки запроса к ИИ",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Career Planner App server running on http://localhost:${PORT}`);
  });
}

startServer();
