import Resume from "../models/Resume.js";
import imagekit from "../configs/imageKit.js";

// Controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({ userId, title });

        return res.status(201).json({
            message: 'Resume created successfully',
            resume: newResume
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for deleting a resume
// DELETE: /api/resumes/delete/:resumeId
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const deletedResume = await Resume.findOneAndDelete({ userId, _id: resumeId });

        if (!deletedResume) {
            return res.status(404).json({ message: 'Resume not found or unauthorized' });
        }

        return res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for getting user resume by id
// GET: /api/resumes/get/:resumeId
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const resumeData = resume.toObject();
        delete resumeData.__v;
        delete resumeData.updatedAt;

        return res.status(200).json({ resume: resumeData });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for getting public resume by id
// GET: /api/resumes/public/:resumeId
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for updating a resume
// PUT: /api/resumes/update
// Inside updateResume controller
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, removeBackground } = req.body;
        let { resumeData } = req.body;
        const image = req.file;

        // 1. Handle JSON Parsing
        if (typeof resumeData === 'string') {
            resumeData = JSON.parse(resumeData);
        }

        // 2. Handle Image Upload
        if (image) {
            if (!image.buffer) {
                throw new Error("File buffer is missing. Check Multer configuration.");
            }

            const response = await imagekit.upload({
                file: image.buffer, 
                fileName: `resume_${Date.now()}.png`,
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face' + (removeBackground === 'yes' ? ',e-bgremove' : '')
                }
            });

            
            if (!resumeData.personal_info) resumeData.personal_info = {};
            resumeData.personal_info.image = response.url;
        }

        
        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            { $set: resumeData }, 
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or unauthorized' });
        }

        return res.status(200).json({ 
            message: 'Saved successfully', 
            resume 
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(400).json({ message: error.message });
    }
};