import React from 'react';
import { Radio } from 'lucide-react';
import siteConfig from '../content/settings/site.json';

export default function Footer() {
    return (
        <footer className="bg-[#08080A] text-background rounded-t-[4rem] pt-24 pb-12 px-6 md:px-16 mt-0 relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 font-sans font-bold tracking-tight text-xl mb-4 text-white">
                        <Radio size={24} className="text-accent" />
                        <span>{siteConfig.name}</span>
                    </div>
                    <p className="font-mono text-sm text-background/60 max-w-xs">
                        {siteConfig.tagline}
                    </p>
                </div>
                {/* ... existing links ... */}
                <div>
                    <h4 className="font-sans font-bold mb-4 text-white">Nav</h4>
                    <ul className="flex flex-col gap-3 font-mono text-sm text-background/60">
                        <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 block duration-300">Listen Live</a></li>
                        <li><a href="#archives" className="hover:text-accent transition-colors hover:translate-x-1 block duration-300">Broadcasts</a></li>
                        <li><a href="#events" className="hover:text-accent transition-colors hover:translate-x-1 block duration-300">Events</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-sans font-bold mb-4 text-white">Legal</h4>
                    <ul className="flex flex-col gap-3 font-mono text-sm text-background/60">
                        <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 block duration-300">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 block duration-300">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors hover:translate-x-1 block duration-300">Cookies</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="font-mono text-xs text-background/40">
                    © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </div>

                <div className="flex items-center gap-2 bg-background/5 px-4 py-2 rounded-full border border-background/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                    <span className="font-mono text-xs tracking-wider text-background/80">SYSTEM OPERATIONAL</span>
                </div>
            </div>
        </footer>
    );
}
