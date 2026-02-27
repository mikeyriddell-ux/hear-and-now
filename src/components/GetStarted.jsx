import React from 'react';
import { Play, Mic } from 'lucide-react';

export default function GetStarted() {
    return (
        <section className="py-32 px-6 flex flex-col items-center justify-center text-center relative z-20 bg-primary">
            <h2 className="font-drama italic text-5xl md:text-7xl mb-6 text-accent">Join the Frequency.</h2>
            <p className="font-sans text-xl text-background/70 max-w-xl mx-auto mb-12">
                Become a member of our global creative community and unlock unlimited archives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="magnetic-btn bg-accent text-primary px-8 py-4 rounded-full font-sans font-bold flex items-center justify-center gap-3 text-lg shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                    <span>Listen Live</span>
                    <Play size={20} fill="currentColor" />
                </button>
                <button className="magnetic-btn bg-background/5 border border-primary/20 text-background px-8 py-4 rounded-full font-sans font-bold flex items-center justify-center gap-3 text-lg hover:bg-background/10">
                    <span>Explore Podcasts</span>
                    <Mic size={20} />
                </button>
            </div>
        </section>
    );
}
