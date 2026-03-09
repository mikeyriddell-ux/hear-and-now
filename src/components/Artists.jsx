import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Music, Zap } from 'lucide-react';

const artistModules = import.meta.glob('../content/artists/*.json', { eager: true });
const artists = Object.values(artistModules).map(mod => mod.default || mod);

export default function Artists() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Heading Animation
            gsap.from(headingRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                }
            });

            // Card Animations
            gsap.from(".artist-card", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".artist-grid",
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 md:px-12 bg-primary overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div ref={headingRef} className="mb-20">
                    <span className="font-mono text-accent tracking-widest uppercase text-sm mb-4 block">Current Selectors</span>
                    <h2 className="font-sans text-5xl md:text-8xl font-bold tracking-tighter text-white">
                        The Residency <br />
                        <span className="font-drama italic text-accent">Program</span>
                    </h2>
                </div>

                <div className="artist-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {artists.map((artist, idx) => (
                        <div
                            key={idx}
                            className="artist-card group relative bg-background/5 rounded-[2rem] overflow-hidden border border-white/5 hover:border-accent/30 transition-colors duration-500"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img
                                    src={artist.image.startsWith('/') ? `${import.meta.env.BASE_URL}${artist.image.slice(1)}` : artist.image}
                                    alt={artist.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                                    style={{
                                        scale: artist.zoomScale || "1.2",
                                        objectPosition: artist.objectPosition || "50% 25%"
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute top-6 right-6">
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <Music className="w-4 h-4 text-accent" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 relative">
                                <span className="font-mono text-xs text-accent/60 uppercase tracking-widest mb-2 block">{artist.role}</span>
                                <h3 className="font-sans text-2xl font-bold text-white mb-2">{artist.name}</h3>
                                <p className="font-sans text-sm text-background/60 leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis line-clamp-2">
                                    {artist.bio}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase bg-white/5 py-1 px-3 rounded-full border border-white/10 text-background/50">
                                        {artist.genre}
                                    </span>
                                    <button className="text-accent group-hover:translate-x-1 transition-transform">
                                        <Zap className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
