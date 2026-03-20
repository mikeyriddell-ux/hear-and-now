import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';
import heroContent from '../content/settings/hero.json';

export default function Hero({ isLive }) {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2
            });
            gsap.from('.hero-cta', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.8
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    // Handle background image path (support local assets or absolute URLs)
    const bgImage = heroContent.image.startsWith('/')
        ? `${import.meta.env.BASE_URL}${heroContent.image.slice(1)}`
        : heroContent.image;

    return (
        <section ref={comp} className="relative h-[100dvh] w-full flex items-end pb-12 md:pb-[296px] px-6 md:px-16 overflow-hidden">
            {/* Background Image: Managed via CMS */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${bgImage}")` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/20" />
            </div>

            <div className="relative z-10 max-w-7xl w-full flex flex-col items-start gap-6">
                <h1 className="flex flex-col gap-2">
                    <span className="hero-text font-sans font-bold text-4xl md:text-6xl tracking-tight text-background">
                        {heroContent.titleLine1}
                    </span>
                    <span className="hero-text font-drama font-black italic text-accent text-7xl md:text-[5.5rem] lg:text-[7rem] xl:text-[9rem] leading-[0.8] md:whitespace-nowrap normal-case tracking-tighter">
                        {heroContent.titleLine2}
                    </span>
                </h1>

                <p className="hero-text text-background/80 font-mono max-w-md text-sm md:text-base uppercase tracking-wider">
                    {heroContent.tagline}
                </p>

                {/* Mobile-only Listen Live Button */}
                {isLive && (
                    <div className="md:hidden animate-fade-in">
                        <a
                            href="https://www.mixcloud.com/live/forestrytransmission/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 text-white px-8 py-4 rounded-full font-sans font-bold text-lg shadow-2xl inline-flex items-center gap-3 active:scale-95 transition-transform"
                        >
                            <span>Listen Live</span>
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
