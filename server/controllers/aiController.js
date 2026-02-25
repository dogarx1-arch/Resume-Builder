import ai from "../configs/ai.js";

// 1. Professional Summary Enhancement
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) return res.status(400).json({ message: 'Summary text is required' });

        const response = await ai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                { 
                    role: "system", 
                    content: "You are a professional resume writer. Enhance the summary to be impactful. Plain text only, no markdown." 
                },
                { role: "user", content: userContent },
            ],
        });

        const enhancedContent = response.choices[0].message.content.replace(/[*#`]/g, "").trim();
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error("DETAILED AI ERROR:", error.response?.data || error.message);
        return res.status(500).json({ message: "Gemini API Error. Check terminal for details." });
    }
};

// 2. Job Description Enhancement
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) return res.status(400).json({ message: 'Content required' });

        const response = await ai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                { 
                    role: "system", 
                    content: "Enhance this job description using strong action verbs. Return a clean, professional version. Plain text only." 
                },
                { role: "user", content: userContent },
            ],
        });

        const enhancedContent = response.choices[0].message.content.replace(/[*#`]/g, "").trim();
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error("DETAILED AI ERROR:", error.response?.data || error.message);
        return res.status(500).json({ message: "Gemini API Error. Check terminal for details." });
    }
};

// 3. Resume Upload/Extraction
// Matches: aiRouter.post('/upload-resume', ...)
export const uploadResume = async (req, res) => {
    try {
        res.status(201).json({ message: "Feature coming soon" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};