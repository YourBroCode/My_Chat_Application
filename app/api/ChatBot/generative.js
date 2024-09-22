import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GCP_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

export async function POST(req) {
  try {
    const data = await req.json();
    const prompt = data.body;

    // Fetch result from the model
    const result = await model.generateContent(prompt);
    const output = result.response?.text || "No valid response from the model.";

    return NextResponse.json({ output });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong with the API request." }, { status: 500 });
  }
}