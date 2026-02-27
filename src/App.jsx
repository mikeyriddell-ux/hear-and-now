import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Artists from './components/Artists';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';
import MixcloudPlayer from './components/MixcloudPlayer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    const container = useRef(null);

    useLayoutEffect(() => {
        // Optional global gsap context if needed later
        let ctx = gsap.context(() => { }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative w-full bg-primary text-background font-sans">
            <div className="noise-overlay" />
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Artists />
                <GetStarted />
            </main>
            <Footer />
            <MixcloudPlayer />
        </div>
    );
}
