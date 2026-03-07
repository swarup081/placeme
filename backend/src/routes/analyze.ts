import { Router, Request, Response } from 'express';
import multer from 'multer';
import OpenAI from 'openai';
import * as pdfParseModule from 'pdf-parse';

// Handle dynamic module resolution for pdf-parse
const pdfParse = (pdfParseModule as any).default || pdfParseModule;

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

// 1. Create a custom interface that extends the standard Express Request
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 2. Use MulterRequest instead of Request
router.post('/resume', upload.single('resume'), async (req: MulterRequest, res: Response): Promise<any> => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded.' });
        }

        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ error: 'Please upload a PDF file.' });
        }

        // Parse text from PDF buffer
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({ error: 'Could not extract text from the PDF.' });
        }

        const systemPrompt = `You are an expert HR recruiter and career coach. I am providing you with the extracted text from a candidate's resume.
Analyze the resume and return a JSON object with exactly this structure, and NOTHING ELSE:
{
  "candidate": {
    "name": "Candidate's full name",
    "email": "Candidate's email",
    "location": "Candidate's location or City, State"
  },
  "summary": "A brief summary of their profile.",
  "skills": {
    "programming_languages": ["Skill 1", "Skill 2"],
    "frameworks": ["Framework 1", "Framework 2"]
  },
  "analysis": {
    "strengths": ["Strength 1", "Strength 2"],
    "weaknesses": ["Area for improvement 1", "Area for improvement 2"]
  },
  "analytics": {
    "ats_score": "A number from 0 to 100",
    "formatting_feedback": "A short string with feedback on structure/formatting"
  },
  "rewritten_suggestions": {
    "summary": "An improved, impactful version of their summary",
    "bullet_points": ["Improved achievement bullet 1", "Improved achievement bullet 2"]
  }
}
If any specific information is missing from the resume, use "N/A" or an empty array as appropriate. Ensure the response is valid JSON.`;

        // Request JSON from OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: resumeText }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2,
        });

        const resultJsonString = completion.choices[0]?.message?.content;
        
        if (!resultJsonString) {
            throw new Error("OpenAI returned an empty response.");
        }

        const resultJson = JSON.parse(resultJsonString);

        return res.json(resultJson);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error analyzing resume:', errorMessage);
        
        return res.status(500).json({ error: 'Failed to analyze resume.' });
    }
});

export default router;