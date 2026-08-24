import { GoogleGenAI } from "@google/genai";

// Environment variable se API key lekar client initialize karta hai
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default ai;
