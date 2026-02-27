import React from 'react';
import { Circle } from 'lucide-react';

const mixcloudEmbeds = [
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fbump-hustle-live-from-the-collab-271121-20211127-193611%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fheavy-vibes-live-from-the-collab-291021%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fheavy-vibes-20211008-182158%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Feasy-does-it-260921-20210926-095618%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Feasy-does-it-260921-20210926-083121%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fforestry-transmission-live-test-20210924-182326%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fbump-hustle-live-from-the-collab-271121-20211127-193611%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fheavy-vibes-live-from-the-collab-291021%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fheavy-vibes-20211008-182158%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Feasy-does-it-260921-20210926-095618%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Feasy-does-it-260921-20210926-083121%2F",
    "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fforestrytransmission%2Fforestry-transmission-live-test-20210924-182326%2F"
];

export default function Features() {
    return (
        <section id="archives" className="py-24 px-6 md:px-16 w-full max-w-[1400px] mx-auto z-10 relative">

            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl text-background mb-4">The Archive</h2>
                    <p className="font-mono text-sm text-background/60 flex items-center gap-2">
                        <Circle size={8} className="text-accent animate-pulse" fill="currentColor" />
                        Live streaming players from Forestry Transmission
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {mixcloudEmbeds.map((url, i) => (
                    <div
                        key={i}
                        className="bg-background/5 border border-primary/20 rounded-2xl overflow-hidden hover:border-accent/50 transition-colors duration-500 shadow-xl"
                    >
                        {/* We use standard iframe tags. Classic Mixcloud players are height 120 and include full controls to stream audio */}
                        <iframe
                            width="100%"
                            height="120"
                            src={url}
                            frameBorder="0"
                            allow="autoplay"
                            className="w-full opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                ))}
            </div>

        </section>
    );
}
