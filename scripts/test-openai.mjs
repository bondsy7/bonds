import OpenAI from "openai";

// Manually load env
// Leave empty, keys should be in .env.local or environment variables

async function test() {
    console.log("Testing OpenAI API...");
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello?" }],
            model: "gpt-3.5-turbo",
        });
        console.log("Success:", completion.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

test();
