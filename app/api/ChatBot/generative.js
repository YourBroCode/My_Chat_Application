"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateChatResponse(message, history) {
  try {
    // 1. Format the history for Gemini
    // Gemini expects: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
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
      contents: formattedHistory, // Pass the full history here
    });

    return { success: true, text: response.text };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { success: false, text: "Failed to generate response." };
  }
}