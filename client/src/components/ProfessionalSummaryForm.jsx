import React, { useState } from 'react';
import { Sparkles, FileText, Loader2 } from 'lucide-react';
import api from '../configs/api';
import { toast } from 'react-hot-toast';

const ProfessionalSummaryForm = ({ data, onChange, token, setResumeData }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSummary = async () => {
        if (!data || data.trim().length < 10) {
            return toast.error("Please write a short draft first.");
        }

        try {
            setIsGenerating(true);
            const response = await api.post(
                '/api/ai/enhance-pro-sum', 
                { userContent: data }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.enhancedContent) {
                setResumeData(prev => ({
                    ...prev, 
                    professional_summary: response.data.enhancedContent
                }));
                toast.success("Summary enhanced!");
            }
        } catch (error) {
            const errorMsg = error.response?.status === 404 
                ? "AI Endpoint not found. Check server configuration."
                : error.response?.data?.message || error.message;
            toast.error(`AI Error: ${errorMsg}`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className='space-y-8'>
            {/* --- Header & AI Action --- */}
            <div className='flex items-center justify-between pb-2'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                    <p className='text-sm text-gray-500'>Introduce yourself and your career goals</p>
                </div>
                <button 
                    disabled={isGenerating}
                    onClick={generateSummary}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm border
                        ${isGenerating 
                            ? 'bg-gray-100 text-gray-400 border-gray-200' 
                            : 'bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] text-[#2e7d32] border-[#a5d6a7] hover:from-[#c8e6c9] active:scale-95'
                        }`}
                >
                    {isGenerating ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    {isGenerating ? "Enhancing..." : "AI Enhance"}
                </button>
            </div>

            {/* --- Text Area & Pro Tip --- */}
            <div className="relative group">
                <div className='absolute -top-3 left-4 px-2 bg-white text-[10px] font-black text-gray-400 uppercase tracking-widest z-10'>Your Summary</div>
                <textarea
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={8}
                    className='w-full p-5 border border-gray-200 text-sm rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none bg-white group-hover:border-green-200 group-hover:shadow-md'
                    placeholder='e.g. Results-driven Software Engineer...'
                />
                
                <div className='mt-4 flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100'>
                    <div className='p-2 bg-white rounded-lg shadow-sm'>
                        <FileText className='size-4 text-green-600' />
                    </div>
                    <p className='text-xs text-gray-500 leading-relaxed'>
                        <span className='font-bold text-gray-700 block mb-0.5'>Pro Tip:</span>
                        Keep it concise (3-4 sentences). Focus on your most impactful achievements and technical skills.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalSummaryForm;