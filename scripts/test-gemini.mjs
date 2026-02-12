import { GoogleGenerativeAI } from "@google/generative-ai";

// GEMINI_API_KEY should be in .env.local or environment variables

async function test() {
    console.log("Testing gemini-3-flash-preview...");

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const result = await model.generateContent("Hello, are you Gemini 3 Flash?");
        console.log("Response:", result.response.text());
    } catch (e) {
        console.error("Test failed:", e);
    }
}

test();
