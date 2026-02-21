import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Home()
{
    const faqData=[
        {id: 1, question: "What makes AuraLiving different from other student hostels?", answer: "AuraLiving is designed from the ground up for ambitious students — premium interiors, curated study environments, high-speed internet, and a community of motivated peers all in one place."},
        {id: 2, question: "What accommodation options are available?", answer: "We offer fully furnished single, double, and shared rooms — each with ergonomic furniture, ample storage, and daily housekeeping."},
        {id: 3, question: "Are meals included?", answer: "Yes, wholesome, chef-curated meals are served thrice daily, with special dietary options available on request."},
        {id: 4, question: "What study facilities does AuraLiving provide?", answer: "Dedicated silent study lounges, high-speed Wi-Fi (100 Mbps), whiteboards, and 24-hour reading rooms are available to all residents."},
        {id: 5, question: "Is there an age or enrollment requirement?", answer: "AuraLiving is open to students enrolled in recognized colleges, universities, or coaching institutes. Working professionals are welcome at select locations."},
        {id: 6, question: "How do I book a room?", answer: "You can reserve your spot directly through our website, call our admissions team, or visit the hostel for a personal tour."},
        {id: 7, question: "What safety measures are in place?", answer: "Every AuraLiving property has biometric entry, 24/7 CCTV, on-site security staff, and emergency response protocols."},
        {id: 8, question: "Are there recreational and social spaces?", answer: "Yes — rooftop lounges, co-working pods, game rooms, and regular community events make sure life at AuraLiving is as vibrant as it is purposeful."},
    ];

    const [openFaq, setOpenFaq]=useState(null);
    const navigate=useNavigate();
    const mainRef=useRef(null);
    const toggleFaq=(id) => setOpenFaq(openFaq===id? null:id);

    useEffect(() =>
    {
        const ctx=gsap.context(() =>
        {
            /* ── HERO ── */
            const heroTl=gsap.timeline({delay: 0.2});
            heroTl
                .from('.hero-title', {y: 60, opacity: 0, duration: 1, ease: 'power3.out'})
                .from('.hero-subtitle', {y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'}, '-=0.5')
                .from('.hero-btn', {y: 30, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.4')
                .from('.hero-img-main', {scale: 0.7, opacity: 0, duration: 1, ease: 'back.out(1.4)'}, '-=0.8')
                .from('.hero-img-sub', {x: -40, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.4');

            /* ── ABOUT ── */
            gsap.from('.about-img', {x: -80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: '.about-section', start: 'top 80%', once: true}});
            gsap.from('.about-text', {x: 80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: '.about-section', start: 'top 80%', once: true}});

            /* ── FEATURES ── */
            gsap.from('.features-heading', {y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: {trigger: '.features-section', start: 'top 82%', once: true}});
            gsap.from('.feature-card', {y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: {trigger: '.feature-cards-grid', start: 'top 85%', once: true}});

            /* ── DESTINATIONS ── */
            gsap.from('.destinations-text', {x: -60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: '.destinations-section', start: 'top 80%', once: true}});
            gsap.from('.destination-img', {y: 80, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.3)', scrollTrigger: {trigger: '.destinations-section', start: 'top 78%', once: true}});

            /* ── WHY CHOOSE US ── */
            gsap.from('.why-heading', {y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: {trigger: '.why-section', start: 'top 82%', once: true}});
            gsap.from('.why-left', {x: -100, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: {trigger: '.why-rows', start: 'top 82%', once: true}});
            gsap.from('.why-right', {x: 100, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: {trigger: '.why-rows', start: 'top 82%', once: true}});

            /* ── HOME FEEL ── */
            gsap.from('.homefeel-text', {x: -60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: '.homefeel-section', start: 'top 80%', once: true}});
            gsap.from('.homefeel-img', {x: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: '.homefeel-section', start: 'top 80%', once: true}});

            /* ── STATS ── */
            gsap.from('.stat-card', {y: 80, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'back.out(1.4)', scrollTrigger: {trigger: '.stats-section', start: 'top 82%', once: true}});

            /* ── CTA ── */
            gsap.from('.cta-content', {scale: 0.88, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: '.cta-section', start: 'top 82%', once: true}});

            /* ── FAQ ── */
            gsap.from('.faq-heading', {y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: {trigger: '.faq-section', start: 'top 85%', once: true}});
            gsap.from('.faq-item', {y: 30, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out', scrollTrigger: {trigger: '.faq-list', start: 'top 85%', once: true}});

        }, mainRef);

        return () => ctx.kill();
    }, []);

    const features=[
        {icon: <path d="M8 2V22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H8ZM20.0049 2C21.1068 2 22 2.89821 22 3.9908V20.0092C22 21.1087 21.1074 22 20.0049 22H10V2H20.0049Z" />, title: "Premium Study Spaces", desc: "Silent study lounges, 100 Mbps Wi-Fi, and round-the-clock reading rooms built for peak focus."},
        {icon: <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />, title: "Wellness & Balance", desc: "Morning yoga, meditation zones, and recreational spaces to keep your mind and body thriving."},
        {icon: <path d="M12 10C14.2091 10 16 8.20914 16 6 16 3.79086 14.2091 2 12 2 9.79086 2 8 3.79086 8 6 8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5 8 9.11929 6.88071 8 5.5 8 4.11929 8 3 9.11929 3 10.5 3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13 17.1193 13 16 11.8807 16 10.5 16 9.11929 17.1193 8 18.5 8 19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056 18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z" />, title: "Vibrant Community", desc: "Live alongside driven peers, join interest clubs, and grow your network from day one."},
        {icon: <path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598Z" />, title: "Safe & Secure", desc: "Biometric access, 24/7 CCTV, on-site staff, and a gated campus so you can focus without worry."},
    ];

    const whyItems=[
        {side: 'left', title: "Curated Living Spaces", desc: "Every room is thoughtfully designed — ergonomic furniture, ample natural light, and aesthetics that inspire productivity.", icon: <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z" />},
        {side: 'right', title: "Structured Daily Rhythm", desc: "Balanced schedules for study, meals, exercise, and rest — designed to help you perform at your best every day.", icon: <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z" />},
        {side: 'left', title: "Mentorship & Growth", desc: "Connect with experienced mentors, attend workshops, and access resources that accelerate your academic and personal growth.", icon: <path d="M12 7.00002C16.4183 7.00002 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 7.00002 12 7.00002ZM12 10.5L10.6775 13.1797L7.72025 13.6094L9.86012 15.6953L9.35497 18.6406L12 17.25L14.645 18.6406L14.1399 15.6953L16.2798 13.6094L13.3225 13.1797L12 10.5ZM13 1.99902L18 2.00002V5.00002L16.6366 6.13758C15.5305 5.55773 14.3025 5.17887 13.0011 5.04951L13 1.99902ZM11 1.99902L10.9997 5.04943C9.6984 5.17866 8.47046 5.55738 7.36441 6.13706L6 5.00002V2.00002L11 1.99902Z" />},
        {side: 'right', title: "Always-On Support", desc: "Our resident managers and support team are available round the clock for academic queries, emergencies, and everything in between.", icon: <path d="M4 12H7C8.10457 12 9 12.8954 9 14V19C9 20.1046 8.10457 21 7 21H4C2.89543 21 2 20.1046 2 19V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V19C22 20.1046 21.1046 21 20 21H17C15.8954 21 15 20.1046 15 19V14C15 12.8954 15.8954 12 17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z" />},
    ];

    const stats=[
        {icon: <path d="M12 19H14V6.00003L20.3939 8.74028C20.7616 8.89786 21 9.2594 21 9.65943V19H23V21H1V19H3V5.6499C3 5.25472 3.23273 4.89659 3.59386 4.73609L11.2969 1.31251C11.5493 1.20035 11.8448 1.314 11.9569 1.56634C11.9853 1.63027 12 1.69945 12 1.76941V19Z" />, number: "10+", label: "Hostel Locations"},
        {icon: <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z" />, number: "50+", label: "Students Trust Us"},
        {icon: <path d="M22 11V20H20V17H4V20H2V4H4V14H12V7H18C20.2091 7 22 8.79086 22 11ZM8 13C6.34315 13 5 11.6569 5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10C11 11.6569 9.65685 13 8 13Z" />, number: "100+", label: "Beds Available"},
        {icon: <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z" />, number: "4.5+", label: "Ratings"},
    ];

    return (
        <main ref={mainRef} className="w-full h-full overflow-x-hidden">

            {/* ═══════════════ HERO ═══════════════ */}
            <section
                style={{backgroundImage: "url('/main1.png')", backgroundPosition: "center", backgroundSize: "cover"}}
                className="min-h-screen pt-16 w-full relative"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12 py-20 lg:py-0">

                    {/* Text */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-5 text-center lg:text-left">
                        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-[#f0ebd8] leading-tight">
                            <span className="font-bold block">Live Better.</span>
                            <span className="block">Study</span>
                            <span className="font-bold bg-[#f0ebd8] text-[#0d1b2a] inline-block px-3 py-1 mt-2">Harder.</span>
                        </h1>
                        <p className="hero-subtitle text-[#f0ebd8] text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            AuraLiving — premium student housing where design meets discipline and every detail is built for your success.
                        </p>
                        <div className="hero-btn flex justify-center lg:justify-start">
                            <button
                                onClick={() => navigate('/hostel')}
                                className="bg-[#f0ebd8] text-[#0d1b2a] px-8 sm:px-10 text-base sm:text-lg py-3 sm:py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 font-semibold shadow-lg"
                            >
                                Explore Hostels
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem]">
                            {/* Main arch image */}
                            <div className="hero-img-main absolute inset-0 border-4 border-[#f0ebd8] rounded-t-full overflow-hidden bg-[#f0ebd8]">
                                <img src="/room1.jpg" alt="Hostel" className="w-full h-full object-cover" />
                            </div>
                            {/* Small circle */}
                            <div className="hero-img-sub absolute -bottom-4 -left-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#f0ebd8] bg-[#f0ebd8]">
                                <img src="/room2.jpg" alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ ABOUT ═══════════════ */}
            <section className="about-section w-full bg-[#0d1b2a]">
                <div className="container mx-auto flex flex-col lg:flex-row min-h-[28rem] lg:min-h-[36rem]">
                    <div className="about-img w-full lg:w-2/5 h-64 sm:h-72 md:h-80 lg:h-auto relative overflow-hidden lg:rounded-tr-[200px]">
                        <img src="/room3.jpg" alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="about-text w-full lg:w-3/5 flex justify-center items-center p-6 sm:p-10 lg:p-16">
                        <div className="max-w-xl text-[#f0ebd8] space-y-4 sm:space-y-6">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-snug">
                                A Space Designed for Those Who Dare to Dream
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg leading-relaxed opacity-90">
                                AuraLiving is where ambitious students come to focus, connect, and grow. Premium interiors, chef-curated meals, and a community of driven peers — everything you need to perform at your absolute best.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ FEATURES ═══════════════ */}
            <section className="features-section w-full bg-[#f0ebd8] py-14 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="features-heading text-center mb-10 sm:mb-14 lg:mb-16 space-y-3">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0d1b2a]">
                            More Than Just a Place to Stay
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-[#0d1b2a] max-w-2xl mx-auto">
                            We create an ecosystem where academic excellence meets personal growth
                        </p>
                    </div>
                    <div className="bg-[#0d1b2a] p-5 sm:p-8 lg:p-12 xl:p-16 rounded-2xl">
                        <div className="feature-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {features.map((feat, i) => (
                                <div key={i} className="feature-card bg-[#f0ebd8] p-3 rounded-xl hover:-translate-y-2 transition-transform duration-300">
                                    <div className="border-2 border-[#0d1b2a] h-full flex flex-col rounded-xl overflow-hidden">
                                        <div className="h-20 sm:h-24 bg-[#0d1b2a] flex items-center justify-center">
                                            <div className="w-12 h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">{feat.icon}</svg>
                                            </div>
                                        </div>
                                        <div className="p-4 sm:p-5 flex flex-col items-center text-center gap-2">
                                            <h3 className="text-base sm:text-lg font-bold text-[#0d1b2a]">{feat.title}</h3>
                                            <p className="text-xs sm:text-sm text-[#0d1b2a] leading-relaxed">{feat.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ POPULAR DESTINATIONS ═══════════════ */}
            <section className="destinations-section w-full bg-[#0d1b2a] py-14 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

                        {/* Text */}
                        <div className="destinations-text w-full lg:w-1/2 space-y-5 text-center lg:text-left">
                            <span className="inline-block px-4 py-2 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-xs sm:text-sm font-medium">
                                Featured Hostels
                            </span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0ebd8]">Popular Destinations</h2>
                            <p className="text-sm sm:text-base lg:text-lg text-[#f0ebd8] opacity-90">
                                Discover our most loved hostels across India, each designed to nurture your academic journey.
                            </p>
                            <button onClick={() => navigate('/hostel')} className="px-6 sm:px-8 py-3 sm:py-4 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-sm sm:text-base font-semibold hover:scale-105 active:scale-95 transition-all duration-200">
                                View All Hostels
                            </button>
                        </div>

                        {/* Arch images */}
                        <div className="w-full lg:w-1/2 flex items-end justify-center gap-3 sm:gap-5" style={{height: '20rem'}}>
                            {[
                                {src: img1, h: 'h-[70%]'},
                                {src: img2, h: 'h-[90%]'},
                                {src: img3, h: 'h-[70%]'},
                            ].map(({src, h}, i) => (
                                <div key={i} className={`destination-img flex-1 max-w-[7rem] sm:max-w-[9rem] lg:max-w-[10rem] ${h} bg-[#f0ebd8] rounded-t-full overflow-hidden`}>
                                    <img src={src} alt="" className="h-full w-full object-cover object-center" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
            <section className="why-section w-full bg-[#000814] py-14 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="why-heading text-center mb-12 sm:mb-16 lg:mb-20 space-y-4">
                        <span className="inline-block px-4 py-2 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-xs sm:text-sm font-medium">
                            Why Choose Us
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0ebd8]">Your Success is Our Priority</h2>
                        <p className="text-sm sm:text-base lg:text-lg text-[#f0ebd8] max-w-2xl mx-auto opacity-90">
                            We've designed every aspect of our hostels to support your academic journey and personal growth.
                        </p>
                    </div>

                    <div className="why-rows space-y-5 sm:space-y-6 lg:space-y-10">
                        {whyItems.map((item, i) => (
                            <div
                                key={i}
                                className={`${item.side==='left'? 'why-left':'why-right'} w-full lg:w-3/5 bg-[#f0ebd8] p-3 rounded-xl ${item.side==='left'? 'lg:rounded-r-full':'lg:rounded-l-full ml-auto'}`}
                            >
                                <div className={`border-2 border-[#0d1b2a] rounded-xl ${item.side==='left'? 'lg:rounded-r-full':'lg:rounded-l-full'} overflow-hidden`}>
                                    <div className={`flex ${item.side==='right'? 'flex-col-reverse sm:flex-row':'flex-col sm:flex-row'} items-stretch`}>
                                        {/* Icon block — always first in DOM for left, reversed-col for right */}
                                        {item.side==='right'&&(
                                            <div className="w-full sm:w-2/5 bg-[#0d1b2a] flex items-center justify-center py-8 sm:py-0 lg:rounded-l-full">
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#f0ebd8] rounded-full flex items-center justify-center">
                                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">{item.icon}</svg>
                                                </div>
                                            </div>
                                        )}
                                        <div className="w-full sm:w-3/5 p-6 sm:p-8 text-center sm:text-left space-y-2">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0d1b2a]">{item.title}</h3>
                                            <p className="text-sm sm:text-base text-[#0d1b2a] leading-relaxed">{item.desc}</p>
                                        </div>
                                        {item.side==='left'&&(
                                            <div className="w-full sm:w-2/5 bg-[#0d1b2a] flex items-center justify-center py-8 sm:py-0 lg:rounded-r-full">
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#f0ebd8] rounded-full flex items-center justify-center">
                                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">{item.icon}</svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ HOME FEEL ═══════════════ */}
            <section className="homefeel-section w-full bg-[#f0ebd8]">
                <div className="container mx-auto flex flex-col lg:flex-row min-h-[22rem]">
                    <div className="homefeel-text w-full lg:w-2/3 flex items-center justify-center p-8 sm:p-10 lg:p-16 order-2 lg:order-1">
                        <div className="max-w-lg text-center space-y-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1b2a]">
                                Your Aura, Your Space
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-[#0d1b2a] leading-relaxed">
                                Home isn't just four walls — it's the energy of the space you're in. AuraLiving crafts environments that feel warm, personal, and inspiring so you never have to choose between comfort and achievement.
                            </p>
                        </div>
                    </div>
                    <div className="homefeel-img w-full lg:w-1/3 h-64 sm:h-80 lg:h-auto overflow-hidden lg:rounded-tl-[10rem] order-1 lg:order-2">
                        <img src={img4} alt="" className="h-full w-full object-cover object-center" />
                    </div>
                </div>
            </section>

            {/* ═══════════════ STATS ═══════════════ */}
            <section className="stats-section w-full bg-[#0d1b2a] py-14 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <div className="text-center mb-10 sm:mb-14 space-y-3">
                        <span className="inline-block px-4 py-2 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-xs sm:text-sm font-semibold">
                            Our Impact
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0ebd8]">
                            Numbers That Speak for Themselves
                        </h2>
                        <p className="text-sm sm:text-base text-[#f0ebd8] opacity-75 max-w-xl mx-auto">
                            Trusted by students across India for comfort, safety, and academic growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card bg-[#f0ebd8] p-2 sm:p-3 rounded-t-full hover:-translate-y-2 transition-transform duration-300">
                                <div className="border-2 border-[#0d1b2a] rounded-t-full overflow-hidden">
                                    <div className="h-28 sm:h-36 lg:h-40 bg-[#0d1b2a] rounded-t-full flex items-center justify-center">
                                        <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[#f0ebd8] rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 sm:w-7 sm:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">{stat.icon}</svg>
                                        </div>
                                    </div>
                                    <div className="py-5 sm:py-7 px-3 text-center space-y-1">
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1b2a]">{stat.number}</h3>
                                        <p className="text-xs sm:text-sm text-[#0d1b2a] font-medium">{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA ═══════════════ */}
            <section className="cta-section w-full bg-[#f0ebd8] py-16 sm:py-20 lg:py-28">
                <div className="cta-content container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0d1b2a] max-w-4xl mx-auto leading-tight">
                        Your Best Chapter Starts Here.
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-[#0d1b2a] max-w-xl mx-auto leading-relaxed">
                        Join thousands of students across India who chose AuraLiving as the launchpad for their biggest ambitions.
                    </p>
                    <button onClick={() => navigate('/hostel')} className="px-8 sm:px-12 py-3 sm:py-4 bg-[#0d1b2a] text-[#f0ebd8] rounded-full text-sm sm:text-base lg:text-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-200">
                        Find Your Hostel
                    </button>
                </div>
            </section>

            {/* ═══════════════ FAQ ═══════════════ */}
            <section className="faq-section w-full bg-[#0d1b2a] py-14 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="faq-heading text-center mb-10 sm:mb-12 space-y-3">
                        <span className="inline-block px-4 py-2 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-xs sm:text-sm font-medium">FAQs</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0ebd8]">Frequently Asked Questions</h2>
                        <p className="text-sm sm:text-base lg:text-lg text-[#f0ebd8] opacity-80">Everything you need to know about AuraLiving</p>
                    </div>
                    <div className="faq-list max-w-3xl mx-auto space-y-3">
                        {faqData.map((faq) =>
                        {
                            const isOpen=openFaq===faq.id;
                            return (
                                <div key={faq.id} className="faq-item bg-[#f0ebd8] rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3"
                                    >
                                        <h3 className="text-sm sm:text-base text-[#0d1b2a] font-medium flex-1">{faq.question}</h3>
                                        <div className={`flex-shrink-0 w-8 h-8 bg-[#0d1b2a] rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen? 'rotate-180':''}`}>
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f0ebd8">
                                                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen? 'max-h-48 opacity-100':'max-h-0 opacity-0'}`}>
                                        <div className="px-4 sm:px-5 pb-5">
                                            <p className="text-sm sm:text-base text-[#0d1b2a] opacity-80 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </main>
    );
}

export {Home};
