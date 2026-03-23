import React, { useRef, useEffect } from 'react';
import { Circle } from 'lucide-react';

// Load all broadcast modules from the content directory
const broadcastModules = import.meta.glob('../content/broadcasts/*.json', { eager: true });

// Process modules and sort by order
const broadcasts = Object.values(broadcastModules)
    .map(mod => mod.default || mod)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

export default function Features() {
    const iframeRefs = useRef([]);
    const widgetsRef = useRef([]);

    useEffect(() => {
        // Initialize Mixcloud widgets once the script is loaded and component mounts
        if (window.Mixcloud) {
            iframeRefs.current.forEach((iframe, index) => {
                if (!iframe) return;

                // Initialize widget
                const widget = window.Mixcloud.PlayerWidget(iframe);
                widgetsRef.current[index] = widget;

                widget.ready.then(() => {
                    widget.events.play.on(() => {
                        // When this widget plays, pause all others
                        widgetsRef.current.forEach((w, wIndex) => {
                            if (wIndex !== index && w) {
                                w.pause();
                            }
                        });
                    });
                });
            });
        }
    }, [broadcasts]);

    return (
        <section id="latest-shows" className="py-24 px-6 md:px-16 w-full max-w-[1400px] mx-auto z-10 relative">

            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl text-background mb-4">Latest Shows</h2>
                    <p className="font-mono text-sm text-background/60 flex items-center gap-2">
                        <Circle size={8} className="text-accent animate-pulse" fill="currentColor" />
                        Live recordings from Hear & Now selectors
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {broadcasts.map((item, i) => (
                    <div
                        key={i}
                        className="bg-background/5 border border-primary/20 rounded-2xl overflow-hidden hover:border-accent/50 transition-colors duration-500 shadow-xl"
                    >
                        <iframe
                            ref={el => iframeRefs.current[i] = el}
                            id={`mixcloud-widget-${i}`}
                            width="100%"
                            height="120"
                            src={item.url}
                            frameBorder="0"
                            allow="autoplay"
                            title={item.title}
                            className="w-full opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                ))}
            </div>

        </section>
    );
}
