const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // For v1beta, use the model manager if accessible, or just try to get a model.
    // The SDK doesn't expose listModels directly on the main class in all versions?
    // Actually it does usually via `getGenerativeModel`? No.
    // Let's try to fetch via REST if SDK doesn't support it easily in node?
    // SDK usually has a `getGenerativeModel` but not `listModels`.
    // Wait, I can try to use the `makeRequest` or similar if exposed?
    // Or just try a standard `gemini-pro` again?

    // Let's assume standard names. Maybe I need to force a specific version?
    // Let's just try to generate with 'gemini-1.5-flash-001'

    const modelsToTry = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-1.5-pro-001",
        "gemini-1.0-pro",
        "gemini-pro"
    ];

    console.log("Testing models...");

    for (const modelName of modelsToTry) {
        try {
            console.log(`Trying ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`SUCCESS: ${modelName} worked!`);
            const response = await result.response;
            console.log(response.text());
            break;
        } catch (error) {
            console.log(`FAILED: ${modelName} - ${error.message.split('\n')[0]}`);
        }
    }
}

listModels();
