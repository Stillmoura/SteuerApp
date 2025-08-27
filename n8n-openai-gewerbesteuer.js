// n8n JavaScript Code Node - Send Gewerbesteuer JSON to OpenAI
// This code is designed to run in an n8n JavaScript Code Node

const fs = require('fs');
const path = require('path');

// Configuration - Update these values in n8n
const OPENAI_API_KEY = $env.OPENAI_API_KEY || 'your-openai-api-key-here';
const JSON_FILE_PATH = $env.JSON_FILE_PATH || './Gewebresteuertest.json';
const OPENAI_MODEL = $env.OPENAI_MODEL || 'gpt-4';

async function sendToOpenAI() {
    try {
        // Step 1: Read the JSON file
        let jsonContent;
        
        // Try to read from file system first
        if (fs.existsSync(JSON_FILE_PATH)) {
            const fileContent = fs.readFileSync(JSON_FILE_PATH, 'utf8');
            jsonContent = JSON.parse(fileContent);
        } 
        // If file doesn't exist, check if content is provided via n8n input
        else if ($input.all().length > 0 && $input.all()[0].json) {
            jsonContent = $input.all()[0].json;
        } 
        // Fallback: create sample structure
        else {
            jsonContent = {
                "gewerbesteuer": {
                    "jahr": 2024,
                    "betrieb": "Beispiel GmbH",
                    "gewerbeertrag": 50000,
                    "steuerberechnung": {
                        "hebesatz": 400,
                        "steuermessbetrag": 1750,
                        "gewerbesteuer": 7000
                    }
                }
            };
            console.log('Using sample data as JSON file was not found');
        }

        // Step 2: Prepare OpenAI request
        const openaiPayload = {
            model: OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "Du bist ein Experte für deutsche Gewerbesteuer. Analysiere die bereitgestellten Daten und gib eine detaillierte Auswertung zurück."
                },
                {
                    role: "user",
                    content: `Bitte analysiere die folgenden Gewerbesteuerdaten und gib eine Zusammenfassung sowie eventuelle Optimierungsvorschläge:

${JSON.stringify(jsonContent, null, 2)}`
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        };

        // Step 3: Send request to OpenAI
        const response = await $http.request({
            method: 'POST',
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: openaiPayload
        });

        // Step 4: Process response
        if (response.statusCode === 200) {
            const aiResponse = response.body.choices[0].message.content;
            
            return [{
                json: {
                    success: true,
                    timestamp: new Date().toISOString(),
                    input_data: jsonContent,
                    ai_analysis: aiResponse,
                    usage: response.body.usage,
                    model_used: OPENAI_MODEL
                }
            }];
        } else {
            throw new Error(`OpenAI API Error: ${response.statusCode} - ${JSON.stringify(response.body)}`);
        }

    } catch (error) {
        console.error('Error in sendToOpenAI:', error);
        
        return [{
            json: {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
                troubleshooting: {
                    check_api_key: "Ensure OPENAI_API_KEY environment variable is set",
                    check_file_path: "Verify JSON_FILE_PATH points to correct file",
                    check_json_format: "Ensure JSON file has valid format",
                    alternative: "You can also pass JSON data directly via n8n input"
                }
            }
        }];
    }
}

// Execute the function and return results for n8n
return await sendToOpenAI();