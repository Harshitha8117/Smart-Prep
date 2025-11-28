require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
const upload = multer();
const port = 3000;

console.log("GROQ API KEY:", process.env.GROQ_API_KEY);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


/* ===========================
   PDF UPLOAD → TEXT EXTRACTION
=========================== */
app.post('/upload', upload.single('document'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const pdfData = await pdfParse(req.file.buffer);
        res.json({ text: pdfData.text });
    } catch (error) {
        console.error("PDF extraction error:", error);
        res.status(500).json({ error: "Failed to extract text from PDF" });
    }
});


/* ===========================
   AI ANALYSIS ROUTE
=========================== */
app.post('/analyze', async (req, res) => {
    const { documentText, analysisType, pageRange, outputFormat } = req.body;

    if (!documentText) {
        return res.status(400).json({ error: "Document text is required" });
    }

    try {
        /* --------------------------
           BUILD PROMPT DYNAMICALLY
        --------------------------- */
        let prompt = "";

        if (analysisType === "summary") {
            prompt = `
Summarize the following document.

Format: ${outputFormat === "points" ? "bullet points" : "one clear paragraph"}
${pageRange ? `Pages: ${pageRange}` : ""}

Document:
${documentText}
            `;
        }

        else if (analysisType === "questions") {
            prompt = `
Generate study questions from this document.

Required JSON structure (no markdown, no explanations):

{
  "short_answer_questions": [],
  "long_answer_questions": []
}

Document:
${documentText}
            `;
        }

        else {
            prompt = `
Analyze the following document and extract key insights.

${pageRange ? `Pages: ${pageRange}` : ""}

Document:
${documentText}
            `;
        }

        /* --------------------------
           SEND REQUEST TO GROQ
        --------------------------- */
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1500
        });

        if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
            throw new Error("Empty response from Groq");
        }

        const rawResponse = chatCompletion.choices[0].message.content || "";

        /* --------------------------
           CLEAN JSON FROM RESPONSE
        --------------------------- */
        const cleanResponse = rawResponse
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        let parsedResponse;

        try {
            parsedResponse = JSON.parse(cleanResponse);
        } catch (err) {
            // Not valid JSON → send as plain text
            parsedResponse = { content: cleanResponse };
        }

        res.json({
            analysis: parsedResponse,
            type: analysisType,
            format: outputFormat
        });

    } catch (error) {
        console.error("AI analysis error:", error);
        res.status(500).json({
            error: "Failed to analyze document",
            details: error.message
        });
    }
});


/* ===========================
   START SERVER
=========================== */
app.listen(port, () => {
    console.log(`Smart Prep backend running at http://localhost:${port}`);
});
