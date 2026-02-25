import React from 'react'
import { Plus, Trash2, GraduationCap } from 'lucide-react'

const EducationForm = ({ data = [], onChange }) => {

    // --- State Logic ---
    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        };
        onChange([...data, newEducation]);
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    return (
        <div className='space-y-8'>
            {/* --- Header Section --- */}
            <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900'>Education</h3>
                    <p className='text-sm text-gray-500'>Add your academic background and qualifications</p>
                </div>
                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] rounded-md hover:bg-[#c8e6c9] transition-all"
                >
                    <Plus className="size-4 stroke-[3px]" />
                    Add Education
                </button>
            </div>

            {/* --- Form Content --- */}
            {data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50'>
                    <GraduationCap className="w-10 h-10 text-gray-300 mb-2" />
                    <p className='font-medium text-gray-900'>No education records found</p>
                    <p className='text-sm text-gray-500 mt-1'>Click "Add Education" to get started</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {data.map((edu, index) => (
                        <div
                            key={edu._id || index}
                            className="p-6 border border-gray-200 rounded-xl space-y-5 bg-white hover:border-green-200 shadow-sm transition-all"
                        >
                            {/* --- Record Header --- */}
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <span className='flex items-center justify-center size-6 bg-green-100 text-green-700 text-[10px] font-bold rounded-full'>
                                        {index + 1}
                                    </span>
                                    <h4 className='font-bold text-gray-700 uppercase text-[10px] tracking-widest'>Academic Record</h4>
                                </div>
                                <button
                                    onClick={() => removeEducation(index)}
                                    className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all'
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            {/* --- Input Fields --- */}
                            <div className='grid md:grid-cols-2 gap-5'>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>University / School</label>
                                    <input
                                        value={edu.institution || ""}
                                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                        type="text"
                                        placeholder="e.g. Stanford University"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>Degree</label>
                                    <input
                                        value={edu.degree || ""}
                                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                        type="text"
                                        placeholder="e.g. B.Tech"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>Field of Study</label>
                                    <input
                                        value={edu.field || ""}
                                        onChange={(e) => updateEducation(index, "field", e.target.value)}
                                        type="text"
                                        placeholder="e.g. Computer Science"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>Graduation Date</label>
                                    <input
                                        value={edu.graduation_date || ""}
                                        onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                                        type="month"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
                                    />
                                </div>
                                <div className='md:col-span-2 space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1'>GPA / Grade</label>
                                    <input
                                        value={edu.gpa || ""}
                                        onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                        type="text"
                                        placeholder="e.g. 3.8 / 4.0"
                                        className="w-full md:w-1/2 px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EducationForm