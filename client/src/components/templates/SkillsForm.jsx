import React, { useState } from 'react'
import { X, Lightbulb, Plus } from 'lucide-react'

const SkillsForm = ({ data = [], onChange }) => {
    const [inputValue, setInputValue] = useState("");

    const skills = Array.isArray(data) ? data : [];

    const handleAddSkill = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            if (!skills.includes(trimmedValue)) {
                onChange([...skills, trimmedValue]);
            }
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const removeSkill = (skillToRemove) => {
        onChange(skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <div className='space-y-6'>
            {/* Header section with Suggest Skills button removed */}
            <div className='pb-2 border-b border-gray-100'>
                <h3 className='text-lg font-bold text-gray-900'>Skills</h3>
                <p className='text-sm text-gray-500'>Add your technical expertise and soft skills</p>
            </div>

            <div className='space-y-4'>
                {/* Input with the Add Button */}
                <div className='flex gap-2'>
                    <div className='relative flex-1'>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a skill (e.g. React)"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleAddSkill}
                        className="flex items-center gap-2 px-6 py-3 bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] rounded-xl font-bold text-sm hover:bg-[#c8e6c9] active:scale-95 transition-all shadow-sm"
                    >
                        <Plus className="size-4 stroke-[3px]" />
                        Add
                    </button>
                </div>

                {/* Skill Badges Container */}
                <div className='flex flex-wrap gap-2 min-h-[100px] p-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-xl'>
                    {skills.length === 0 ? (
                        <div className="w-full flex flex-col items-center justify-center py-4 text-gray-400">
                            <p className='text-sm italic'>No skills added yet...</p>
                        </div>
                    ) : (
                        skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-green-200 text-green-800 rounded-lg shadow-sm group hover:border-green-400 transition-all"
                            >
                                <span className='text-sm font-medium'>{skill}</span>
                                <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className='text-gray-400 hover:text-red-500 transition-colors'
                                >
                                    <X className="size-3.5 stroke-[3px]" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className='flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100'>
                    <div className='p-1.5 bg-blue-100 rounded-md'>
                        <Lightbulb className="size-4 text-blue-600" />
                    </div>
                    <p className='text-xs text-blue-700 leading-relaxed'>
                        Include **keywords** from job descriptions to increase your visibility to recruiters.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SkillsForm