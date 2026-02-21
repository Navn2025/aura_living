import {Link} from "react-router-dom";
import {useEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import logo from "../assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

const Footer=() =>
{
    const footerRef=useRef(null);

    useEffect(() =>
    {
        const ctx=gsap.context(() =>
        {
            /* ── SEMI-CIRCLES wave-in ── */
            gsap.from('.footer-circle', {
                y: -60, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'bounce.out',
                scrollTrigger: {trigger: '.footer-circles', start: 'top 92%', once: true}
            });

            /* ── FOOTER COLUMNS ── */
            gsap.from('.footer-col', {
                y: 40, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
                scrollTrigger: {trigger: '.footer-content', start: 'top 90%', once: true}
            });

            /* ── BOTTOM BAR ── */
            gsap.from('.footer-bottom', {
                opacity: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {trigger: '.footer-bottom', start: 'top 95%', once: true}
            });
        }, footerRef);

        return () => ctx.kill();
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#0d1b2a] text-[#f0ebd8] relative overflow-hidden">
            {/* SEMI-CIRCLES — responsive count to prevent overflow */}
            <div className="footer-circles w-full overflow-hidden">
                <div className="sm:hidden grid grid-flow-col auto-cols-fr w-full">
                    {Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="footer-circle aspect-square bg-[#f0ebd8] rounded-b-full" />
                    ))}
                </div>
                <div className="hidden sm:grid lg:hidden grid-flow-col auto-cols-fr w-full">
                    {Array.from({length: 10}).map((_, i) => (
                        <div key={i} className="footer-circle aspect-square bg-[#f0ebd8] rounded-b-full" />
                    ))}
                </div>
                <div className="hidden lg:grid grid-flow-col auto-cols-fr w-full">
                    {Array.from({length: 14}).map((_, i) => (
                        <div key={i} className="footer-circle aspect-square bg-[#f0ebd8] rounded-b-full" />
                    ))}
                </div>
            </div>

            {/* FOOTER CONTENT */}
            <div className="footer-content max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="footer-col">
                    <div className="flex items-center gap-3 mb-3">
                        <img src={logo} alt="AuraLiving Logo" className="w-10 h-10 object-contain rounded-lg" />
                        <h2 className="text-2xl font-bold">AuraLiving</h2>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Premium student living for those who refuse to settle. Design-forward spaces, vibrant community, and every amenity you need to thrive.
                    </p>
                </div>

                <div className="footer-col">
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li><Link to="/" className="hover:underline hover:opacity-70 transition-opacity">Home</Link></li>
                        <li><Link to="/hostels" className="hover:underline hover:opacity-70 transition-opacity">Hostels</Link></li>
                        <li><Link to="/contact" className="hover:underline hover:opacity-70 transition-opacity">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>Jagdalpur, Chhattisgarh, India</li>
                        <li>+91 8989140402</li>
                        <li>hello@auraliving.in</li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="footer-bottom border-t border-[#f0ebd8]/30 text-center py-4 text-sm opacity-70">
                © {new Date().getFullYear()} AuraLiving. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
