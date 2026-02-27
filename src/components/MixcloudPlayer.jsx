import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Radio, ChevronUp, ChevronDown, Activity } from 'lucide-react';

const archives = [
    { name: "Bump & Hustle live from the Collab", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/bump-hustle-live-from-the-collab-271121-20211127-193611/" },
    { name: "Heavy Vibes live from The Collab", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/heavy-vibes-live-from-the-collab-291021/" },
    { name: "Heavy Vibes (Oct 2021)", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/heavy-vibes-20211008-182158/" },
    { name: "Easy Does It - 26/09/21 - PART 2", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/easy-does-it-260921-20210926-095618/" },
    { name: "Easy Does It - 26/09/21", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/easy-does-it-260921-20210926-083121/" },
    { name: "Weekend Warmup - Episode 5", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/friday-night-selections/" },
    { name: "Weekend Warmup - Episode 4", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/weekend-warm-up/" },
    { name: "Weekend Warmup - Episode 3", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/mike-riddell-the-weekend-warm-up/" },
    { name: "Sunday Special", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/sunday-session/" },
    { name: "Weekend Warmup - Episode 2", url: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=/forestrytransmission/dj-mike-riddell-in-the-mix/" }
];

export default function MixcloudPlayer() {
    const [currentSet, setCurrentSet] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const playerRef = useRef(null);
    const contentRef = useRef(null);
    const iframeContainerRef = useRef(null);

    useEffect(() => {
        const randomSet = archives[Math.floor(Math.random() * archives.length)];
        setCurrentSet(randomSet);

        const handleConnect = () => {
            setIsConnected(true);
            setIsExpanded(true);

            // Imperative injection to preserve User Gesture for Autoplay
            if (iframeContainerRef.current && !iframeContainerRef.current.hasChildNodes()) {
                const iframe = document.createElement('iframe');
                iframe.width = "100%";
                iframe.height = "120";
                iframe.src = randomSet.url;
                iframe.frameBorder = "0";
                iframe.allow = "autoplay";
                iframe.title = randomSet.name;
                iframeContainerRef.current.appendChild(iframe);
            }
        };

        window.addEventListener('connect-radio', handleConnect);

        // Initial entrance animation
        gsap.from(playerRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            delay: 2,
            ease: "power4.out"
        });

        return () => window.removeEventListener('connect-radio', handleConnect);
    }, []);

    useEffect(() => {
        if (isExpanded && isConnected) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.6,
                ease: "power3.inOut"
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power3.inOut"
            });
        }
    }, [isExpanded, isConnected]);

    if (!currentSet) return null;

    return (
        <div
            ref={playerRef}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md pointer-events-auto"
        >
            <div className="bg-primary/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                {/* Header / Toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full p-4 md:p-6 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center relative">
                            <Radio className="w-5 h-5 text-accent animate-pulse" />
                            <Activity className="absolute -top-1 -right-1 w-3 h-3 text-accent" />
                        </div>
                        <div className="text-left">
                            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">Live Archive</span>
                            <h4 className="font-sans text-xs md:text-sm font-bold text-white leading-none line-clamp-1">{currentSet.name}</h4>
                        </div>
                    </div>
                    <div className="text-background/40 group-hover:text-accent transition-colors">
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </div>
                </button>

                {/* Content / Embed */}
                <div
                    ref={contentRef}
                    className="overflow-hidden h-0 opacity-0"
                >
                    <div className="p-4 md:p-6 pt-0 border-t border-white/5">
                        <div
                            ref={iframeContainerRef}
                            className="aspect-video w-full rounded-xl overflow-hidden bg-black/40"
                        >
                            {/* Iframe injected here imperatively on connect */}
                        </div>
                        <p className="mt-4 font-sans text-[10px] text-background/40 leading-relaxed italic">
                            Each refresh discovers a new frequency from our global residency archives.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
