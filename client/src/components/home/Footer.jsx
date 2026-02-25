import React from 'react';

const Footer = () => {
    // Current year to keep the copyright dynamic
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Note: '1g:px-24' was corrected to 'lg:px-24' */}
            <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-green-200/60 to-white mt-40">
                <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
                    <a href="/">
                        <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
                    </a>
                    
                    <div>
                        <p className="text-slate-800 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-green-600 transition-colors">Home</a></li>
                            <li><a href="/support" className="hover:text-green-600 transition-colors">Support</a></li>
                            <li><a href="/pricing" className="hover:text-green-600 transition-colors">Pricing</a></li>
                            <li><a href="/affiliate" className="hover:text-green-600 transition-colors">Affiliate</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-slate-800 font-semibold">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/company" className="hover:text-green-600 transition-colors">Company</a></li>
                            <li><a href="/blogs" className="hover:text-green-600 transition-colors">Blogs</a></li>
                            <li><a href="/community" className="hover:text-green-600 transition-colors">Community</a></li>
                            <li>
                                <a href="/careers" className="hover:text-green-600 transition-colors flex items-center">
                                    Careers
                                    <span className="text-[10px] text-white bg-green-600 rounded-md ml-2 px-2 py-0.5 font-medium">
                                        We’re hiring!
                                    </span>
                                </a>
                            </li>
                            <li><a href="/about" className="hover:text-green-600 transition-colors">About</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-slate-800 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/privacy" className="hover:text-green-600 transition-colors">Privacy</a></li>
                            <li><a href="/terms" className="hover:text-green-600 transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60 leading-relaxed">
                        Making every customer feel valued—no matter the size of your audience.
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                        {/* Social Links */}
                        <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" aria-label="Dribbble">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path></svg>
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" aria-label="X (Twitter)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </a>
                    </div>
                    <p className="mt-3">© {currentYear} Resume Builder</p>
                </div>
            </footer>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                footer {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </>
    );
};

export default Footer;