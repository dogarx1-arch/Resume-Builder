import React from 'react';
import { BookUser } from 'lucide-react';
import Title from './Title';

const Testimonials = () => {
    const cardsData = [
        { image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200', name: 'Briar Martin', handle: '@neilstellar', text: "Radiant made undercutting all of our competitors an absolute breeze." },
        { image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200', name: 'Avery Johnson', handle: '@averywrites', text: "The AI suggestions are surprisingly human-like and professional." },
        { image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60', name: 'Jordan Lee', handle: '@jordantalks', text: "Finally, a resume builder that doesn't feel like a chore to use." },
        { image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60', name: 'Sam Rivera', handle: '@samdesign', text: "Streamlined my workflow and helped me land 3 interviews in a week." },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-5 rounded-xl mx-4 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 w-72 shrink-0">
            <div className="flex gap-3">
                <img className="size-11 rounded-full object-cover" src={card.image} alt={card.name} />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-slate-900">{card.name}</p>
                        <span className="text-blue-500">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </span>
                    </div>
                    <span className="text-xs text-slate-500">{card.handle}</span>
                </div>
            </div>
            <p className="text-sm mt-4 text-slate-700 leading-relaxed italic">"{card.text}"</p>
        </div>
    );

    return (
        <section id='testimonials' className='py-20 bg-slate-50/50 overflow-hidden'>
            <div className='flex flex-col items-center mb-12'>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-100 rounded-full px-4 py-1">
                    <BookUser className="size-4" />
                    <span>Testimonials</span>
                </div>
                <Title 
                    title="Trusted by Job Seekers" 
                    description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools.' 
                />
            </div>

            {/* Marquee Rows */}
            {[false, true].map((isReverse, i) => (
                <div key={i} className="flex overflow-hidden select-none group py-4">
                    <div className={`flex min-w-full shrink-0 items-center justify-around gap-4 ${isReverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                </div>
            ))}

            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-marquee { animation: marquee 30s linear infinite; }
                .animate-marquee-reverse { animation: marquee 30s linear infinite reverse; }
                .group:hover .animate-marquee, .group:hover .animate-marquee-reverse { animation-play-state: paused; }
            `}</style>
        </section>
    );
};

export default Testimonials;