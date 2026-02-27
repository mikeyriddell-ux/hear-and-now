import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const containerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    className: 'scrolled-nav',
                    targets: navRef.current,
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
        <div ref={containerRef} className="fixed top-8 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
            {/* Logo positioned top-left outside the navbar, using NYC subway CSS typography */}
            <div className="absolute top-0 left-8 pointer-events-auto">
                <a href="/" className="block group">
                    <h1 className="font-subway text-4xl md:text-5xl lg:text-[4.5rem] text-background leading-none tracking-tight uppercase group-hover:scale-[1.02] transition-transform duration-500 origin-top-left drop-shadow-xl [&.scrolled-nav_h1]:text-primary">
                        HEAR & NOW
                    </h1>
                </a>
            </div>

            <nav
                ref={navRef}
                className="
          pointer-events-auto
          hidden md:flex items-center justify-center
          px-6 md:px-12 py-4 md:py-5 rounded-[2rem] md:rounded-[2.5rem]
          transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          bg-transparent text-background border border-transparent
          [&.scrolled-nav]:bg-background/80 [&.scrolled-nav]:backdrop-blur-xl [&.scrolled-nav]:text-primary [&.scrolled-nav]:border-primary/10 [&.scrolled-nav]:shadow-2xl
          w-auto max-w-4xl mx-auto gap-8 md:gap-12
        "
            >
                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12 text-base font-semibold tracking-wide">
                    <a href="/" className="text-accent hover:-translate-y-[1px] transition-transform relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-accent">Home</a>
                    <a href="#listen" className="hover:-translate-y-[1px] transition-transform opacity-80 hover:opacity-100">Listen Live</a>
                    <a href="#archives" className="hover:-translate-y-[1px] transition-transform opacity-80 hover:opacity-100">Broadcasts</a>
                    <a href="#community" className="hover:-translate-y-[1px] transition-transform opacity-80 hover:opacity-100">Community</a>
                </div>
            </nav>

            {/* Top Right Actions: Subscribe (Desktop) + Burger (Mobile) */}
            <div className="absolute top-0 right-8 pointer-events-auto flex items-center gap-4">
                <button className="magnetic-btn bg-accent text-primary px-8 py-4 rounded-full font-sans font-bold text-base shadow-xl hover:shadow-accent/20 transition-shadow hidden sm:block">
                    <span>Subscribe</span>
                </button>

                <button
                    onClick={toggleMenu}
                    className="md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-background/80 backdrop-blur-xl text-primary border border-primary/10 shadow-xl transition-transform active:scale-95"
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
                    <a href="/" onClick={toggleMenu} className="mobile-nav-link text-accent">Home</a>
                    <a href="#listen" onClick={toggleMenu} className="mobile-nav-link text-background hover:text-accent transition-colors">Listen Live</a>
                    <a href="#archives" onClick={toggleMenu} className="mobile-nav-link text-background hover:text-accent transition-colors">Broadcasts</a>
                    <a href="#community" onClick={toggleMenu} className="mobile-nav-link text-background hover:text-accent transition-colors">Community</a>
                    <button className="mobile-nav-link mt-4 bg-accent text-primary px-10 py-5 rounded-full text-xl font-bold">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}
