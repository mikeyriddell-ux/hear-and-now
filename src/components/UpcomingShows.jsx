import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Radio } from 'lucide-react';

const showModules = import.meta.glob('../content/upcoming-shows/*.json', { eager: true });
const upcomingShows = Object.values(showModules)
    .map(mod => mod.default || mod)
    .filter(show => show.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

const artistModules = import.meta.glob('../content/artists/*.json', { eager: true });
const artists = Object.values(artistModules).map(mod => mod.default || mod);

export default function UpcomingShows() {
    const sectionRef = useRef(null);

    const resolveImagePath = (path) => {
        if (!path) return '';
        return path;
    };

    useLayoutEffect(() => {
        if (upcomingShows.length === 0) return;

        let ctx = gsap.context(() => {
            gsap.from(".upcoming-card", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (upcomingShows.length === 0) return null;

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-16 w-full max-w-[1400px] mx-auto z-10 relative">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl text-background mb-4">Upcoming Transmissions</h2>
                    <p className="font-mono text-sm text-background/60 flex items-center gap-2">
                        <Radio size={14} className="text-accent animate-pulse" />
                        Next on air
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingShows.map((show, idx) => {
                    const artistMatch = artists.find(a => a.name?.toLowerCase() === show.selector?.toLowerCase());

                    return (
                    <div
                        key={idx}
                        className="upcoming-card bg-background/5 border border-primary/20 rounded-2xl overflow-hidden hover:border-accent/50 transition-colors duration-500 shadow-xl flex"
                    >
                        {show.image && (
                            <div className="w-1/3 min-w-[120px] md:min-w-[160px] aspect-square flex-shrink-0">
                                <img
                                    src={resolveImagePath(show.image)}
                                    alt={show.selector}
                                    className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        )}
                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <div className="flex items-center gap-2 text-primary font-mono text-[10px] md:text-xs uppercase tracking-widest bg-accent px-3 py-1 rounded-full font-bold whitespace-nowrap">
                                    <Calendar size={12} />
                                    {show.date}
                                </div>
                                <div className="flex items-center gap-2 text-background/60 font-mono text-[10px] md:text-xs uppercase tracking-widest border-l border-primary/20 pl-3 whitespace-nowrap">
                                    <Clock size={12} />
                                    {show.time}
                                </div>
                                {artistMatch && artistMatch.genre && (
                                    <div className="flex items-center gap-2 text-accent font-mono text-[10px] md:text-xs uppercase tracking-widest border-l border-primary/20 pl-3 whitespace-nowrap">
                                        {artistMatch.genre}
                                    </div>
                                )}
                            </div>
                            <h3 className="font-sans text-2xl md:text-3xl font-bold text-background group-hover:text-accent transition-colors mb-2">
                                {show.selector}
                            </h3>
                            {artistMatch && artistMatch.bio && (
                                <p className="font-sans text-sm md:text-base text-background/60 line-clamp-2 md:line-clamp-3">
                                    {artistMatch.bio}
                                </p>
                            )}
                        </div>
                    </div>
                )})}
            </div>
        </section>
    );
}
