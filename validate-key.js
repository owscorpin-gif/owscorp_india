const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testKey() {
    const key = "AIzaSyDtkfVrURjxN2QQF7fDAbbmDstbarIinN0";
    console.log("Starting test for key: " + key.substring(0, 10) + "...");

    const models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro-latest"];
    const genAI = new GoogleGenerativeAI(key);

    for (const modelName of models) {
        console.log(`\nTesting model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            console.log(`SUCCESS [${modelName}]: ${response.text()}`);
            return; // Stop on first success
        } catch (error) {
            console.error(`FAILED [${modelName}]: ${error.message.split('\n')[0]}`);
        }
    }
}

testKey().catch(e => console.error("Script error:", e));
