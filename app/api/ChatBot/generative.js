"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are a helpful and precise AI assistant. Follow these rules strictly:

1. NO HALLUCINATIONS: Do not make up facts. If you do not know the answer, explicitly say "I don't know" or "I don't have that information."
2. CONCISE: Keep responses short, direct, and to the point. Avoid unnecessary fluff or long paragraphs unless detailed explanation is requested.
3. ABUSE HANDLING: If the user uses abusive, profane, or offensive language, calmly refuse to engage with that specific content. Respond with: "I prefer to keep our conversation respectful. How else can I help you?"
`;

export async function generateChatResponse(message, history) {
  try {

    const formattedHistory = history.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // 2. Add the NEW message to the end of the history
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    // 3. Send the entire conversation context to Gemini

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
      },
      contents: formattedHistory, // Pass the full history here
    });

    return { success: true, text: response.text };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { success: false, text: "Failed to generate response." };
  }
}