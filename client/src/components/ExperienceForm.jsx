import React, { useState } from 'react'
import { Plus, Trash2, Briefcase, Sparkles, Loader2 } from 'lucide-react'
import axios from 'axios'

const ExperienceForm = ({ data = [], onChange }) => {
    const [loadingIndex, setLoadingIndex] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

    // --- Action Handlers ---
    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience]);
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    // --- AI Integration ---
    const handleAiEnhance = async (index) => {
        const currentContent = data[index].description;
        const jobTitle = data[index].position;

        if (!currentContent && !jobTitle) {
            alert("Please enter a Job Title or a few notes first.");
            return;
        }

        try {
            setLoadingIndex(index);
            const response = await axios.post(`${API_BASE_URL}/ai/enhance-job-desc`, {
                userContent: `Job Title: ${jobTitle}. Description: ${currentContent}`
            }, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.enhancedContent) {
                updateExperience(index, "description", response.data.enhancedContent);
            }
        } catch (error) {
            console.error("AI Enhancement failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to enhance description.");
        } finally {
            setLoadingIndex(null);
        }
    }

    return (
        <div className='space-y-8'>
            {/* --- Header --- */}
            <div className='flex items-center justify-between pb-2'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Professional Experience </h3>
                    <p className='text-sm text-gray-500'>Highlight your career journey and achievements</p>
                </div>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] rounded-md hover:bg-[#c8e6c9] transition-all duration-200"
                >
                    <Plus className="size-4 stroke-[2px]" />
                    Add Experience
                </button>
            </div>

            {/* --- Empty State --- */}
            {data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50'>
                    <div className='p-4 bg-white rounded-full shadow-sm mb-4'>
                        <Briefcase className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className='font-medium text-gray-900'>Your experience is empty</p>
                    <p className="text-sm text-gray-500 mb-6">Click the green button above to add your first role.</p>
                </div>
            ) : (
                /* --- Experience List --- */
                <div className='space-y-6'>
                    {data.map((experience, index) => (
                        <div
                            key={index}
                            className="group p-6 border border-gray-200 rounded-xl space-y-5 bg-white hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
                        >
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-3'>
                                    <span className='flex items-center justify-center size-7 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-100'>
                                        {index + 1}
                                    </span>
                                    <h4 className='font-bold text-gray-700 uppercase text-[10px] tracking-widest'>Experience Entry</h4>
                                </div>
                                <button
                                    onClick={() => removeExperience(index)}
                                    className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200'
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-5'>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>Company</label>
                                    <input
                                        value={experience.company || ""}
                                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                                        type="text" placeholder="e.g. Microsoft"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>Job Title</label>
                                    <input
                                        value={experience.position || ""}
                                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                                        type="text" placeholder="e.g. Project Manager"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>Start Date</label>
                                    <input
                                        value={experience.start_date || ""}
                                        onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                                        type="month"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all"
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>End Date</label>
                                    <input
                                        value={experience.end_date || ""}
                                        onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                                        type="month"
                                        disabled={experience.is_current}
                                        className={`w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-all ${experience.is_current ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' : 'cursor-pointer focus:ring-2 focus:ring-emerald-500'}`}
                                    />
                                </div>
                            </div>

                            <label className='flex items-center gap-3 cursor-pointer w-fit py-1'>
                                <input
                                    type="checkbox"
                                    checked={experience.is_current || false}
                                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                                    className='peer size-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer transition-all'
                                />
                                <span className='text-sm font-semibold text-gray-600 peer-checked:text-emerald-700 transition-colors'>I currently work here</span>
                            </label>

                            <div className="space-y-3 pt-2">
                                <div className='flex items-center justify-between'>
                                    <label className='text-[10px] font-black text-gray-500 uppercase tracking-widest'>Key Responsibilities</label>
                                    <button 
                                        type="button"
                                        onClick={() => handleAiEnhance(index)}
                                        disabled={loadingIndex === index}
                                        className='flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full hover:bg-emerald-100 transition-all disabled:opacity-50'
                                    >
                                        {loadingIndex === index ? <Loader2 className='size-3 animate-spin' /> : <Sparkles className='size-3' />}
                                        {loadingIndex === index ? 'Enhancing...' : 'Auto-Generate'}
                                    </button>
                                </div>
                                <textarea
                                    value={experience.description || ""}
                                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                                    rows={4}
                                    className="w-full text-sm px-4 py-3 border border-gray-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all leading-relaxed"
                                    placeholder="Briefly describe your impact..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm