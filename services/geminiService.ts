
import { GoogleGenAI } from "@google/genai";

export async function callGeminiAI(
  model: string,
  prompt: string,
  systemInstruction?: string,
  useSearch: boolean = false
) {
  // Use process.env.API_KEY directly as required by guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const config: any = {
    temperature: 0.7,
    topP: 0.95,
  };

  if (systemInstruction) {
    config.systemInstruction = systemInstruction;
  }

  if (useSearch) {
    config.tools = [{ googleSearch: {} }];
  }

  // Use thinking for complex tasks if requested (handled by model name logic)
  if (model === 'gemini-3-pro-preview') {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config,
    });
    
    // Use .text property as per guidelines (not .text())
    return {
      text: response.text || '',
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
