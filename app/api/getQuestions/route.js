// app/api/getQuestions/route.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.9,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return new Response("Topic is required", { status: 400 });
    }

    const prompt = `Give me 10 frequently asked interview questions on "${topic}", and for each one include a detailed but concise answer.
Return a JSON array in this exact format:

[
  {
    "question": "What is ...?",
    "answer": "..."
  },
  ...
]

Only return the JSON. Do not include explanations, notes, or markdown.`;

    const chat = await model.startChat();
    const result = await chat.sendMessage(prompt);
    const text = result.response.text().trim();

    // Try parsing the response safely
    let qaPairs;
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      qaPairs = JSON.parse(cleaned);
    } catch (jsonError) {
      console.error("❌ JSON Parse Error:", jsonError.message);
      console.log("📦 Raw Gemini response:", text);
      return new Response("Gemini returned invalid JSON", { status: 500 });
    }

    return new Response(JSON.stringify({ questions: qaPairs }), { status: 200 });

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}
