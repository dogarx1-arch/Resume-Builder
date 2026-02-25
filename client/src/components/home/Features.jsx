import React from 'react';
import { Zap, Sparkles, Layout, Download } from 'lucide-react';
import Title from './Title';

const Features = () => {
    return (
        <section id='features' className='flex flex-col items-center my-20 py-10 scroll-m-12'>
            {/* Badge */}
            <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-400/10 rounded-full px-6 py-1.5 mb-4">
                <Zap size={14} className="fill-green-600" />
                <span>Simple & Fast</span>
            </div>

            <Title 
                title='Build your dream resume' 
                description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and expert-designed templates.' 
            />

            <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:-mt-10 w-full max-w-7xl px-6">
                {/* Visual Asset */}
                <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end lg:-ml-20">
                    <img 
                        className="max-w-xl w-full object-contain" 
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" 
                        alt="Resume Preview" 
                    />
                </div>

                {/* Features List */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4 mt-10 lg:mt-0">
                    
                    {/* Feature 1: AI Writing */}
                    <div className="group cursor-pointer">
                        <div className="p-6 bg-transparent border border-transparent group-hover:bg-violet-50 group-hover:border-violet-200 rounded-2xl transition-all duration-300 flex gap-5">
                            <div className="p-3 h-fit rounded-lg bg-violet-100 text-violet-600">
                                <Sparkles size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-slate-800">AI-Powered Writing</h3>
                                <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                                    Generate impactful bullet points and professional summaries tailored to your target job.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Templates */}
                    <div className="group cursor-pointer">
                        <div className="p-6 bg-transparent border border-transparent group-hover:bg-green-50 group-hover:border-green-200 rounded-2xl transition-all duration-300 flex gap-5">
                            <div className="p-3 h-fit rounded-lg bg-green-100 text-green-600">
                                <Layout size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-slate-800">ATS-Friendly Layouts</h3>
                                <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                                    Our templates are designed to pass through Applicant Tracking Systems without a hitch.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Export */}
                    <div className="group cursor-pointer">
                        <div className="p-6 bg-transparent border border-transparent group-hover:bg-orange-50 group-hover:border-orange-200 rounded-2xl transition-all duration-300 flex gap-5">
                            <div className="p-3 h-fit rounded-lg bg-orange-100 text-orange-600">
                                <Download size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-slate-800">Instant PDF Export</h3>
                                <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                                    Download your polished resume in high-quality PDF format, ready to send to recruiters.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                #features {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </section>
    );
};

export default Features;