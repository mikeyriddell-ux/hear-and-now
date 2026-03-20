import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import siteConfig from '../content/settings/site.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ isLive }) {
    const navRef = useRef(null);
    const rightActionsRef = useRef(null);
    const containerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    className: 'scrolled-nav',
                    targets: containerRef.current,
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (isOpen) {
                gsap.to(mobileMenuRef.current, {
                    clipPath: 'circle(150% at 100% 0%)',
                    duration: 0.8,
                    ease: 'power3.inOut'
                });
                gsap.from('.mobile-nav-link', {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    delay: 0.3,
                    ease: 'power3.out'
                });
            } else {
                gsap.to(mobileMenuRef.current, {
                    clipPath: 'circle(0% at 100% 0%)',
                    duration: 0.6,
                    ease: 'power3.inOut'
                });
            }
        });
        return () => ctx.revert();
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div ref={containerRef} className="fixed top-6 md:top-8 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
            {/* Logo positioned top-left outside the navbar, using NYC subway CSS typography */}
            <div className="absolute top-6 md:top-1/2 md:-translate-y-1/2 left-8 md:left-16 pointer-events-auto flex items-center">
                <a href="#" onClick={scrollToTop} className="block group px-4 py-2 -ml-4 rounded-[12px] transition-all duration-500 [.scrolled-nav_&]:bg-black [.scrolled-nav_&]:shadow-2xl">
                    <h1 className="font-subway text-4xl md:text-5xl lg:text-[4.5rem] text-white leading-none tracking-tight uppercase group-hover:scale-[1.02] transition-transform duration-500 origin-top-left drop-shadow-xl"><span className="glass-logo">
                        {siteConfig.name}</span>
                    </h1>
                </a>
            </div>

            {/* Desktop Nav - Pill shape, right-aligned content */}
            <nav
                ref={navRef}
                className="
          pointer-events-auto
          hidden md:flex items-center justify-end
          px-8 py-4 md:py-5 rounded-[2rem] md:rounded-[2.5rem]
          transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          bg-transparent text-background border border-transparent
          [.scrolled-nav_&]:bg-background/80 [.scrolled-nav_&]:backdrop-blur-xl [.scrolled-nav_&]:text-primary [.scrolled-nav_&]:border-primary/10 [.scrolled-nav_&]:shadow-2xl
          w-auto max-w-5xl ml-auto mr-8 gap-8 md:gap-12
        "
            >
                {/* Desktop Nav Links */}
                <div className="flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
                    <a href="#latest-shows" className="hover:text-accent hover:-translate-y-[1px] transition-all opacity-80 hover:opacity-100">Latest Shows</a>
                    <a href="#events" className="hover:text-accent hover:-translate-y-[1px] transition-all opacity-80 hover:opacity-100">Events</a>
                    <a href="#selectors" className="hover:text-accent hover:-translate-y-[1px] transition-all opacity-80 hover:opacity-100">Selectors</a>
                </div>

                {isLive && (
                    <a
                        href="https://www.mixcloud.com/live/forestrytransmission/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 text-white px-8 py-3.5 rounded-full font-sans font-bold text-sm shadow-xl hover:shadow-red-500/20 hover:scale-[1.03] active:scale-95 transition-all inline-flex items-center group cursor-pointer"
                    >
                        <span>Listen Live</span>
                        <span className="w-2 h-2 rounded-full bg-white ml-3 animate-pulse"></span>
                    </a>
                )}
            </nav>

            {/* Top Right Actions: Burger (Mobile Only now) */}
            <div
                ref={rightActionsRef}
                className="absolute top-6 md:top-1/2 md:-translate-y-1/2 right-8 pointer-events-auto flex items-center md:hidden transition-all duration-500 [.scrolled-nav_&]:text-primary"
            >
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-background/80 backdrop-blur-xl text-primary border border-primary/10 shadow-xl transition-transform active:scale-95"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 bg-primary z-[60] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
                style={{ clipPath: 'circle(0% at 100% 0%)' }}
            >
                <div className="absolute top-8 right-8">
                    <button onClick={toggleMenu} className="text-background hover:text-accent transition-colors">
                        <X size={40} />
                    </button>
                </div>
                <div className="flex flex-col items-center gap-8 text-3xl font-bold tracking-tighter">
                    {/* Home Link Hidden from Mobile Nav */}
                    <a href="#latest-shows" onClick={toggleMenu} className="mobile-nav-link text-background hover:text-accent transition-colors">Latest Shows</a>
                    <a href="#events" onClick={toggleMenu} className="mobile-nav-link text-background hover:text-accent transition-colors">Events</a>
                    <a href="#selectors" onClick={toggleMenu} className="mobile-nav-link text-background hover:text-accent transition-colors">Selectors</a>

                    {isLive && (
                        <a
                            href="https://www.mixcloud.com/live/forestrytransmission/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-nav-link mt-4 bg-red-600 text-white px-10 py-5 rounded-full text-xl font-bold flex items-center shadow-2xl"
                        >
                            Listen Live
                            <span className="w-3 h-3 rounded-full bg-white ml-4 animate-pulse"></span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
