import React from 'react'
import { Plus, Trash2, FolderOpen, Sparkles } from 'lucide-react'

const ProjectsForm = ({ data = [], onChange }) => {
    const projects = Array.isArray(data) ? data : [];

    const addProject = () => {
        const newProject = { name: "", type: "", description: "" };
        onChange([...projects, newProject]);
    }

    const removeProject = (index) => {
        const updated = projects.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateProject = (index, field, value) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    return (
        <div className='space-y-8'>
            <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900'>Projects</h3>
                    <p className='text-sm text-gray-500'>Showcase your best work and side projects</p>
                </div>
                <button
                    onClick={addProject}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] rounded-md hover:bg-[#c8e6c9] transition-all"
                >
                    <Plus className="size-4 stroke-[3px]" />
                    Add Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl'>
                    <FolderOpen className="size-10 text-gray-300 mb-2" />
                    <p className='text-gray-500 text-sm font-medium'>No projects added yet.</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {projects.map((project, index) => (
                        <div key={project._id || index} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-green-300 transition-all">
                            <div className='flex justify-between items-center mb-6'>
                                <span className='bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider'>
                                    Project {index + 1}
                                </span>
                                <button
                                    onClick={() => removeProject(index)}
                                    className='p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Team Task Management"
                                        value={project.name || ""}
                                        onChange={(e) => updateProject(index, "name", e.target.value)}
                                        className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>Project Type</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Web Application"
                                        value={project.type || ""}
                                        onChange={(e) => updateProject(index, "type", e.target.value)}
                                        className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className='mt-5 space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1'>Description</label>
                                    <button type="button" className='flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md hover:bg-green-100'>
                                        <Sparkles className='size-3' /> AI Enhance
                                    </button>
                                </div>
                                <textarea
                                    rows={3}
                                    placeholder="Describe impact..."
                                    value={project.description || ""}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectsForm