import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
// Note: Ideally, API keys should be handled on a backend to prevent exposure.
// For this frontend-only demo, we assume the key is available in the environment.
const ai = new GoogleGenAI({ apiKey: apiKey });

export const getStoneCareAdvice = async (userQuery: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "I'm currently offline (API Key missing). Please contact our team directly at 9887561872.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `You are an expert AI consultant for "Arjun Marble Polish Contractor". 
        Your role is to provide professional advice on marble, granite, and tile maintenance.
        
        Our Services & Prices:
        - Sada Polish: ₹15/sq.ft
        - Granite Polish: ₹35/sq.ft
        - Marble Buffering: ₹20/sq.ft
        - Diamond Polish: ₹55/sq.ft
        - Tile Cleaning: ₹12/sq.ft
        - Home Cleaning (Single Room): ₹600/room
        - Home Cleaning (Whole House): ₹7000/package
        
        Guidelines:
        1. Be polite, professional, and helpful.
        2. Keep answers concise (under 100 words unless detailed explanation is asked).
        3. Always recommend our professional services for deep stains or restoration.
        4. If asked about booking, tell them to use the 'Book Now' button or call 9887561872.
        5. Do not invent services we do not offer.
        
        Address: 223A Vaishnav Vihar, Nangal Jaise Bohra, Jhotawara Jaipur.
        Phone: 9887561872.`,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please call us directly.";
  }
};