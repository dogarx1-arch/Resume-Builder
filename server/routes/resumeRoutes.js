import express from "express"; 
import protect from "../middlewares/authMiddleware.js";
import {
    createResume,
    deleteResume,
    getPublicResumeById,
    getResumeById,
    updateResume
} from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

// @route   POST /api/resumes/create
resumeRouter.post('/create', protect, createResume);

// @route   PUT /api/resumes/update

resumeRouter.put('/update', upload.single('image'), protect, updateResume);

// @route   DELETE /api/resumes/delete/:resumeId
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);

// @route   GET /api/resumes/get/:resumeId

resumeRouter.get('/get/:resumeId', protect, getResumeById);

// @route   GET /api/resumes/public/:resumeId

resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;