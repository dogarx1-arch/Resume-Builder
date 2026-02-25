import React from 'react'

const CallToAction = () => {
    return (
        <section className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-6 sm:px-16 mt-28'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-10 px-6 md:px-14 border-x border-dashed border-slate-200 py-16 sm:py-24 -mt-px -mb-px w-full">
                
                <h2 className="text-2xl md:text-3xl font-semibold max-w-md text-slate-800 leading-tight">
                    Build a Professional Resume That Helps You Stand Out
                </h2>

                <div className="flex flex-col items-center md:items-start gap-3">
                    <a 
                        href="https://prebuiltui.com" 
                        className="group flex items-center gap-2 rounded-full py-4 px-10 bg-green-600 hover:bg-green-700 transition-all active:scale-95 text-white font-medium shadow-lg shadow-green-600/20"
                    >
                        <span>Get Started Now</span>
                        
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                    <p className="text-xs text-slate-500">No credit card required</p>
                </div>

            </div>
        </section>
    )
}

export default CallToAction