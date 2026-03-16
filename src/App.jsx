import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Artists from './components/Artists';
import Events from './components/Events';
import Footer from './components/Footer';
import MixcloudPlayer from './components/MixcloudPlayer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    const container = useRef(null);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const checkLiveStatus = async () => {
            try {
                const query = `query UserLiveStreamQuery($u: UserLookup!) { user: userLookup(lookup: $u) { liveStream { streamStatus } } }`;
                const variables = JSON.stringify({ u: { username: "forestrytransmission" } });
                const mixcloudUrl = `https://app.mixcloud.com/graphql?query=${encodeURIComponent(query)}&variables=${encodeURIComponent(variables)}`;

                // Add timestamp to avoid proxy caching
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(mixcloudUrl)}&timestamp=${Date.now()}`;
                const response = await fetch(proxyUrl);

                if (response.ok) {
                    const data = await response.json();
                    if (data.contents) {
                        try {
                            const gqlData = JSON.parse(data.contents);
                            const liveStream = gqlData?.data?.user?.liveStream;
                            const status = liveStream?.streamStatus;

                            console.log("Mixcloud Live Check:", { status, hasStream: !!liveStream });

                            if (status === 'LIVE') {
                                setIsLive(true);
                            } else {
                                setIsLive(false);
                            }
                        } catch (parseErr) {
                            if (data.contents.includes('"streamStatus":"LIVE"')) {
                                setIsLive(true);
                            } else {
                                setIsLive(false);
                            }
                        }
                    }
                }
            } catch (err) {
                setIsLive(false);
            }
        };

        checkLiveStatus();
        const intervalId = setInterval(checkLiveStatus, 180000);
        return () => clearInterval(intervalId);
    }, []);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => { }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative w-full bg-primary text-background font-sans">
            <div className="noise-overlay" />
            <Navbar isLive={isLive} />
            <main>
                <Hero isLive={isLive} />
                <Features />
                <Events />
                <Artists />
            </main>
            <Footer />
            {/* <MixcloudPlayer /> */}
        </div>
    );
}
