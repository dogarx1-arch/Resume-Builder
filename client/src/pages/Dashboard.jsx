import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as pdfToTextModule from 'react-pdftotext';
const pdfToText = pdfToTextModule.default || pdfToTextModule;
import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon,
  LoaderCircleIcon,
  ArrowLeft,
  XIcon
} from 'lucide-react';
import api from '../configs/api';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- State Management ---
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  // --- Data Fetching ---
  const loadAllResumes = async () => {
    if (!token) return;
    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllResumes(data.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load resumes");
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, [token]);

  // --- Resume Operations ---
  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(
        '/api/resumes/create',
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle('');
      setShowCreateResume(false);
      toast.success("Resume Created!");
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Creation failed");
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!resume) return toast.error("Please select a file first");
    
    setIsLoading(true);
    try {
      const extractText = typeof pdfToText === 'function' ? pdfToText : (pdfToText.default || pdfToText);
      const resumeText = await extractText(resume);
      
      if (!resumeText) throw new Error("Could not read text from PDF");

      const { data } = await api.post(
        '/api/ai/upload-resume',
        { title, resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
      toast.success("AI parsed your resume successfully!");
    } catch (error) {
      toast.error(error.message || "Parsing failed");
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
    try {
      await api.put(
        '/api/resumes/update',
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllResumes(allResumes.map(res => res._id === editResumeId ? { ...res, title } : res));
      setTitle('');
      setEditResumeId(null);
      toast.success("Updated successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const deleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllResumes(prev => prev.filter(res => res._id !== resumeId));
        toast.success("Deleted successfully");
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      toast.error("Please upload a valid PDF file");
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>

        {/* --- Navigation Bar --- */}
        <div className='mb-6'>
          <Link to="/" className='inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group'>
            <ArrowLeft className='size-4 group-hover:-translate-x-1 transition-transform' />
            <span className='font-medium text-sm'>Back to Home</span>
          </Link>
        </div>

        {/* --- Action Buttons --- */}
        <div className='flex flex-wrap gap-4'>
          <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300'>
            <PlusIcon className='size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600'>Create Resume</p>
          </button>

          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300'>
            <UploadCloudIcon className='size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-purple-600'>Upload Existing</p>
          </button>
        </div>

        <hr className='border-slate-300 my-6 sm:w-[305px]' />

        {/* --- Resumes List --- */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resumeItem, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <div
                key={resumeItem._id}
                className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10 10%, ${baseColor}40)`,
                  borderColor: baseColor + '40'
                }}
                onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
              >
                <FilePenLineIcon className="size-7" style={{ color: baseColor }} />
                <p className='text-sm font-medium px-2 text-center truncate w-full' style={{ color: baseColor }}>{resumeItem.title}</p>
                <div onClick={e => e.stopPropagation()} className='absolute top-1 right-1 hidden group-hover:flex items-center gap-1'>
                  <TrashIcon onClick={() => deleteResume(resumeItem._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <PencilIcon onClick={() => { setEditResumeId(resumeItem._id); setTitle(resumeItem.title); }} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                </div>
              </div>
            )
          })}
        </div>

        {/* --- Modals (Upload, Create, Edit) --- */}
        {showUploadResume && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <form onSubmit={uploadResume} className='relative bg-white shadow-2xl rounded-xl w-full max-w-sm p-8'>
              <h2 className='text-2xl font-bold mb-2'>Upload PDF</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Resume Title' className='w-full px-4 py-2 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-green-600' required />
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf" />
              <div onClick={() => !isLoading && fileInputRef.current.click()} className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 mb-6 cursor-pointer ${resume ? 'border-green-500 bg-green-50' : 'border-slate-300'}`}>
                {resume ? <p className='text-green-700 text-sm truncate'>{resume.name}</p> : <p className='text-slate-500 text-sm'>Select PDF</p>}
              </div>
              <button type="submit" disabled={isLoading} className='w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:bg-green-400'>
                {isLoading && <LoaderCircleIcon className='animate-spin size-4' />}
                {isLoading ? 'Uploading...' : 'Upload Resume'}
              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 cursor-pointer' onClick={() => { setShowUploadResume(false); setTitle(''); setResume(null); }} />
            </form>
          </div>
        )}

        {showCreateResume && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <form onSubmit={createResume} className='relative bg-white shadow-2xl rounded-xl w-full max-w-sm p-8'>
              <h2 className='text-2xl font-bold mb-4'>New Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='e.g. Developer' className='w-full px-4 py-2 mb-6 border rounded-lg' required />
              <button type="submit" className='w-full py-3 bg-green-600 text-white font-semibold rounded-lg'>Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 cursor-pointer' onClick={() => setShowCreateResume(false)} />
            </form>
          </div>
        )}

        {editResumeId && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <form onSubmit={editTitle} className='relative bg-white shadow-2xl rounded-xl w-full max-w-sm p-8'>
              <h2 className='text-xl font-bold mb-4'>Rename</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className='w-full px-4 py-2 mb-6 border rounded-lg' required />
              <button type="submit" className='w-full py-3 bg-green-600 text-white font-semibold rounded-lg'>Update Title</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 cursor-pointer' onClick={() => setEditResumeId(null)} />
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;