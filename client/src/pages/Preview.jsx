import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon, Download as DownloadIcon } from 'lucide-react';
import api from '../configs/api';
import ResumePreview from '../components/ResumePreview';

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500"></div>
  </div>
);

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      setResumeData(data.resume);
    } catch (err) {
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const printResume = () => {
    window.print();
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  if (isLoading) {
    return <Loader />;
  }

  return resumeData ? (
    <div className='min-h-screen bg-slate-100'>
      <div className='max-w-4xl mx-auto py-10 px-4'>
        <div id="resume-print-root">
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            classes='py-4 bg-white shadow-lg'
          />
        </div>
        <div className='flex justify-center mt-6 print:hidden'>
          <button
            onClick={printResume}
            className='flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] text-[#2e7d32] border border-[#a5d6a7] rounded-lg font-bold text-sm hover:from-[#c8e6c9] active:scale-95 transition-all shadow-sm'
          >
            <DownloadIcon size={15} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
      <p className='text-center text-4xl lg:text-6xl text-slate-400 font-medium'>
        Resume not found
      </p>
      <Link
        to="/"
        className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 flex items-center transition-colors shadow-md'
      >
        <ArrowLeftIcon className='mr-2 size-4' />
        go to home page
      </Link>
    </div>
  );
};

export default Preview;