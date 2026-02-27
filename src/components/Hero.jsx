import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';

export default function Hero() {
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

    return (
        <section ref={comp} className="relative h-[50dvh] md:h-[100dvh] w-full flex items-end pb-12 md:pb-24 px-6 md:px-16 overflow-hidden">
            {/* Background Image: High-end Audiophile Speakers / Listening Bar */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1653579656823-307797687591?q=80&w=2670&auto=format&fit=crop")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/20" />
            </div>

            <div className="relative z-10 max-w-7xl w-full flex flex-col items-start gap-6">
                <h1 className="flex flex-col gap-2">
                    <span className="hero-text font-sans font-bold text-4xl md:text-6xl tracking-tight text-background">
                        Broadcasting live
                    </span>
                    <span className="hero-text font-subway text-6xl md:text-8xl text-accent lg:text-[10rem] leading-none md:whitespace-nowrap">
                        7 nights a week.
                    </span>
                </h1>

                <p className="hero-text text-background/80 font-mono max-w-md text-sm md:text-base uppercase tracking-wider">
                    Global sounds from local talent
                </p>

                <div className="hero-cta mt-4">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('connect-radio'))}
                        className="hero-text magnetic-btn bg-accent text-primary px-10 py-5 rounded-full font-sans font-bold text-lg shadow-2xl hover:shadow-accent/40 transition-shadow flex items-center gap-4"
                    >
                        <span>CONNECT TO BROADCAST</span>
                        <Play size={22} fill="currentColor" />
                    </button>
                </div>
            </div>
        </section>
    );
}
