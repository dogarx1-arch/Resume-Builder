import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeft, User, FileText, Briefcase, GraduationCap, FolderOpen,
  Sparkles, ChevronLeft, ChevronRight, Layout, Check, Palette, Save,
  Share2 as Share2Icon, Eye as EyeIcon, EyeOff as EyeOffIcon, Download as DownloadIcon
} from 'lucide-react';
import api from '../Configs/api';
import { toast } from 'react-hot-toast';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/templates/SkillsForm';

// --- 1. RESTORED TEMPLATE SELECTOR DESIGN ---
const TemplateSelector = ({ selectedTemplate, onChange, isOpen, setIsOpen }) => {
  const templates = [
    { id: "classic", name: "Classic", preview: "A clean, traditional format with clear sections" },
    { id: "modern", name: "Modern", preview: "Sleek design with strategic use of color" },
    { id: "minimal-image", name: "Minimal Image", preview: "Minimal design with a profile photo" },
    { id: "minimal", name: "Minimal", preview: "Ultra-clean design focused on content" }
  ];

  return (
    <div className='relative'>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'
      >
        <Layout size={14} /> <span className='max-sm:hidden'>Template</span>
      </button>
      {isOpen && (
        <div className='absolute top-full w-64 p-3 mt-2 z-50 bg-white rounded-md border border-gray-200 shadow-xl space-y-2'>
          {templates.map((t) => (
            <div 
              key={t.id} 
              onClick={() => { onChange(t.id); setIsOpen(false); }} 
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === t.id ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50 border-gray-100"}`}
            >
              {selectedTemplate === t.id && (
                <div className="absolute top-2 right-2 size-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}
              <h4 className='font-medium text-sm text-gray-800'>{t.name}</h4>
              <p className='text-[10px] text-gray-500 italic mt-1'>{t.preview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- 2. MAIN COMPONENT ---
const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const templateRef = useRef(null);
  const colorRef = useRef(null);

  const initialState = {
    _id: "",
    title: "",
    personal_info: { full_name: "", email: "", phone: "", location: "", profession: "", linkedin: "", website: "", image: null },
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "modern",
    accent_color: "#3882F6",
    public: false,
  };

  const [resumeData, setResumeData] = useState(initialState);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (templateRef.current && !templateRef.current.contains(event.target)) setIsTemplateOpen(false);
      if (colorRef.current && !colorRef.current.contains(event.target)) setIsColorOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsTemplateOpen(false);
    setIsColorOpen(false);
  }, [activeSectionIndex]);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));
      const { data } = await api.put('/api/resumes/update', formData, { 
        headers: { Authorization: `Bearer ${token}` } // Fixed prefix
      });
      setResumeData(prev => ({ ...prev, public: data.resume.public }));
      toast.success(data.message);
    } catch (error) {
      toast.error("Error updating visibility");
    }
  };

  const handleSaveAndNext = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      const isNewFile = resumeData.personal_info.image instanceof File;
      formData.append('resumeData', JSON.stringify(resumeData));

      if (isNewFile) {
        formData.append("image", resumeData.personal_info.image);
        if (removeBackground) {
            formData.append("removeBackground", "yes");
            toast('AI Background removal in progress...', { icon: '🤖' });
        }
      }

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: `Bearer ${token}` } 
      });

      setResumeData(data.resume);
      toast.success("Progress Saved!");
      if (activeSectionIndex < sections.length - 1) {
        setActiveSectionIndex(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Check required fields");
    } finally {
      setIsSaving(false);
    }
  };

  const loadExistingResume = async () => {
    if (!token || !resumeId) return;
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (data.resume) setResumeData(data.resume);
    } catch (error) {
      console.log("Error loading:", error.message);
    }
  };

  const handleDataChange = (key, value) => {
    setResumeData(prev => ({ ...prev, [key]: value }));
  };

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderOpen },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => { loadExistingResume(); }, [resumeId, token]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-5'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative overflow-hidden'>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500" style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%` }}></div>
              </div>

              <div className="flex justify-between items-center mb-6 py-4 mt-2 border-b border-gray-100">
                <div className="flex gap-2">
                  <div ref={templateRef}>
                    <TemplateSelector 
                      isOpen={isTemplateOpen} setIsOpen={setIsTemplateOpen} 
                      selectedTemplate={resumeData.template} onChange={(t) => handleDataChange('template', t)} 
                    />
                  </div>
                  <div ref={colorRef}>
                    <ColorPicker 
                      isOpen={isColorOpen} setIsOpen={setIsColorOpen} 
                      selectedColor={resumeData.accent_color} onChange={(c) => handleDataChange('accent_color', c)} 
                    />
                  </div>
                </div>
                <h2 className="flex items-center gap-2 font-bold text-gray-800"><activeSection.icon className="size-5 text-green-600" /> {activeSection.name}</h2>
                <div className='flex gap-1'>
                  <button onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))} className={`p-2 hover:bg-gray-100 rounded-md transition-colors ${activeSectionIndex === 0 ? 'invisible' : ''}`}><ChevronLeft size={20}/></button>
                  <button onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))} className='p-2 hover:bg-gray-100 rounded-md transition-colors' disabled={activeSectionIndex === sections.length - 1}><ChevronRight size={20}/></button>
                </div>
              </div>

              <div className='space-y-6'>
                {activeSection.id === 'personal' && <PersonalInfoForm data={resumeData.personal_info} onChange={(d) => handleDataChange('personal_info', d)} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
                
                
                {activeSection.id === 'summary' && <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(d) => handleDataChange('professional_summary', d)} token={token} setResumeData={setResumeData} />}
                
                {activeSection.id === 'experience' && <ExperienceForm data={resumeData.experience} onChange={(d) => handleDataChange('experience', d)} />}
                {activeSection.id === 'education' && <EducationForm data={resumeData.education} onChange={(d) => handleDataChange('education', d)} />}
                {activeSection.id === 'projects' && <ProjectsForm data={resumeData.project} onChange={(d) => handleDataChange('project', d)} />}
                {activeSection.id === 'skills' && <SkillsForm data={resumeData.skills} onChange={(d) => handleDataChange('skills', d)} />}

                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-start">
                  <button
                    disabled={isSaving}
                    onClick={handleSaveAndNext}
                    className={`px-6 py-2.5 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] text-[#2e7d32] border border-[#a5d6a7] rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#c8e6c9] active:scale-95'}`}
                  >
                    {isSaving ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-700 border-t-transparent"></div> : <Save size={16} />}
                    {isSaving ? "Processing..." : (activeSectionIndex === sections.length - 1 ? "Save Final Changes" : "Save & Next")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-7'>
             {/* ... (Existing Preview UI) */}
             <div className='flex justify-end gap-2 mb-4'>
              {resumeData.public && (
                <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/view/${resumeId}`); toast.success("Link copied!"); }} className='p-2 px-4 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg shadow-sm'><Share2Icon className='size-4' /></button>
              )}
              <button onClick={changeResumeVisibility} className='p-2 px-4 flex items-center gap-2 bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg text-sm font-medium shadow-sm'>
                {resumeData.public ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />} 
                {resumeData.public ? 'Public' : 'Private'}
              </button>
              <button onClick={() => window.print()} className='px-6 py-2 flex items-center gap-2 bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg text-sm font-medium shadow-sm'><DownloadIcon size={16} /> Download</button>
            </div>
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;