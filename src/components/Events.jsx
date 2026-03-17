import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

const eventModules = import.meta.glob('../content/events/*.json', { eager: true });
const events = Object.values(eventModules)
    .map(mod => mod.default || mod)
    .filter(event => event.enabled !== false);

export default function Events() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    const resolveImagePath = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        const base = (import.meta.env.BASE_URL || '').replace(/\/$/, '');
        return `${base}${normalizedPath}`.replace(/\/+/g, '/');
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Fail-safe: ensure cards are visible even if ScrollTrigger fails
            const fallback = setTimeout(() => {
                gsap.to(".event-card", { opacity: 1, y: 0, stagger: 0.1 });
            }, 3000);

            gsap.from(headingRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 90%",
                    once: true
                }
            });

            gsap.from(".event-card", {
                y: 40,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 95%",
                    once: true,
                    onEnter: () => clearTimeout(fallback)
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="events" ref={sectionRef} className="py-32 px-6 md:px-12 bg-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div ref={headingRef} className="mb-20">
                    <span className="font-mono text-accent tracking-[0.3em] uppercase text-xs mb-6 block font-bold">In-Person Signal</span>
                    <h2 className="font-sans text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                        Upcoming <br />
                        <span className="font-drama italic text-accent normal-case tracking-normal">Gatherings</span>
                    </h2>
                </div>

                <div className="event-grid grid grid-cols-1 gap-12">
                    {events.map((event, idx) => (
                        <div
                            key={idx}
                            className="event-card group grid grid-cols-1 lg:grid-cols-12 bg-white/[0.03] rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-700 hover:shadow-[0_0_50px_-12px_rgba(201,168,76,0.2)]"
                        >
                            <div className="lg:col-span-5 aspect-square lg:h-auto min-h-[300px] overflow-hidden relative">
                                <img
                                    src={resolveImagePath(event.image)}
                                    alt={event.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 bg-white/5"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:hidden" />
                                <div className="absolute bottom-6 left-6 lg:hidden">
                                    <span className="bg-accent text-primary font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {event.venue}
                                    </span>
                                </div>
                            </div>

                            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <span className="hidden lg:block bg-accent text-primary font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {event.venue}
                                    </span>
                                    <div className="flex items-center gap-2 text-accent/80 font-mono text-xs uppercase tracking-widest">
                                        <Calendar size={14} />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-accent/80 font-mono text-xs uppercase tracking-widest border-l border-white/10 pl-4">
                                        <Clock size={14} />
                                        <span>{event.time}</span>
                                    </div>
                                </div>

                                <h3 className="font-sans text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-accent transition-colors duration-500">
                                    {event.title}
                                </h3>

                                <p className="font-sans text-lg text-background/60 leading-relaxed max-w-2xl mb-10">
                                    {event.description}
                                </p>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-white/5">
                                    <div className="flex items-start gap-3 max-w-xs text-background/40 group-hover:text-background/70 transition-colors">
                                        <MapPin className="w-5 h-5 shrink-0 text-accent" />
                                        <span className="text-sm font-medium leading-tight">{event.location}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
