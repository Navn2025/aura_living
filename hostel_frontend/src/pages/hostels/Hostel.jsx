import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHostels} from '../../store/slice/hostel.slice';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import HostelCard from '../../components/HostelCard';

gsap.registerPlugin(ScrollTrigger);

const Hostel=() =>
{
    const dispatch=useDispatch();
    const hostels=useSelector((state) => state.hostels.hostels);
    const status=useSelector((state) => state.hostels.status);
    const mainRef=useRef(null);
    const cardsAnimated=useRef(false); // prevent card animation from running twice

    useEffect(() => {dispatch(fetchHostels());}, [dispatch]);

    /* ── HERO ANIMATIONS: run only once on mount ── */
    useEffect(() =>
    {
        const ctx=gsap.context(() =>
        {
            const heroTl=gsap.timeline({delay: 0.15});
            heroTl
                .from('.hostel-hero-title', {y: 70, opacity: 0, duration: 1, ease: 'power3.out'})
                .from('.hostel-hero-desc', {y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'}, '-=0.5')
                .from('.hostel-hero-btn', {y: 30, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.4')
                .from('.hostel-arc-1', {y: 120, opacity: 0, duration: 1, ease: 'back.out(1.4)'}, '-=0.8')
                .from('.hostel-arc-2', {y: 140, opacity: 0, duration: 1, ease: 'back.out(1.4)'}, '-=0.7')
                .from('.hostel-arc-3', {y: 100, opacity: 0, duration: 1, ease: 'back.out(1.4)'}, '-=0.6');
        }, mainRef);

        return () => ctx.kill(); // keep elements visible on route-change
    }, []); // ← empty deps: hero runs exactly once

    /* ── CARD ANIMATIONS: run only once after cards load ── */
    useEffect(() =>
    {
        if (status!=='succeeded'||cardsAnimated.current) return;
        cardsAnimated.current=true;

        // Small delay so React finishes rendering the cards into the DOM
        const timer=setTimeout(() =>
        {
            gsap.from('.hostel-card-anim', {
                y: 60, opacity: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.hostel-grid',
                    start: 'top 86%',
                    once: true,
                },
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [status]); // ← only triggers when status changes, guarded by ref

    return (
        <main ref={mainRef} className='w-full bg-[#0d1b2a] overflow-x-hidden'>
            {/* ── Hero Section ── */}
            <section
                style={{backgroundImage: "url('/main1.png')", backgroundPosition: "center", backgroundSize: "cover"}}
                className='w-full h-screen min-h-150 hero-bg flex flex-col relative overflow-hidden'
            >
                {/* Title */}
                <div className='text-[#f0ebd8] text-center pt-16 sm:pt-20 md:pt-24 lg:pt-28 px-4 sm:px-6 md:px-8'>
                    <h1 className='hostel-hero-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight'>
                        AuraLiving — Premium Student Residences
                    </h1>
                </div>

                {/* Content Container */}
                <div className='flex-1 flex flex-col lg:flex-row w-full'>
                    {/* Left Content */}
                    <div className='w-full lg:w-3/5 flex justify-center lg:justify-start items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-0'>
                        <div className='w-full max-w-2xl lg:max-w-none lg:w-4/5 flex gap-5 sm:gap-6 md:gap-8 lg:gap-10 flex-col items-center lg:items-start text-center lg:text-left'>
                            <h2 className='hostel-hero-desc text-[#f0ebd8] text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-medium leading-snug sm:leading-tight'>
                                Your Perfect Study Sanctuary Awaits
                            </h2>
                            <p className='hostel-hero-desc text-[#f0ebd8] text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-md sm:max-w-lg md:max-w-xl'>
                                Discover design-forward residences built exclusively for ambitious students. High-speed Wi-Fi, chef-curated meals, and a community wired for success.
                            </p>
                            <button onClick={() => document.querySelector('.hostel-grid')?.scrollIntoView({behavior: 'smooth'})} className='hostel-hero-btn bg-[#f0ebd8] text-[#0d1b2a] px-5 xs:px-6 sm:px-8 md:px-10 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-md font-semibold hover:bg-[#e0d8b8] transition-all duration-300 text-xs xs:text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0'>
                                Find Your Hostels
                            </button>
                        </div>
                    </div>

                    {/* Right Decorative Arcs */}
                    <div className='w-full lg:w-2/5 flex relative items-end justify-center pb-6 sm:pb-8 md:pb-10 lg:pb-0 px-4'>
                        <div className='relative flex items-end justify-center scale-75 xs:scale-85 sm:scale-90 md:scale-95 lg:scale-100'>
                            <div className='hostel-arc-1 bg-[#f0ebd8] rounded-t-full z-30 p-2 h-90 w-64 sm:h-64 sm:w-48 md:h-72 md:w-52 lg:h-80 lg:w-60 shadow-2xl flex-shrink-0'>
                                <div className='overflow-hidden border-2 h-full w-full rounded-t-full border-[#0d1b2a]'>
                                    <img src={img5} alt="" className='h-full w-full object-cover' />
                                </div>
                            </div>
                            <div className='hostel-arc-2 bg-[#f0ebd8] rounded-t-full z-20 -ml-14 sm:-ml-16 md:-ml-18 lg:-ml-20 -mb-10 sm:-mb-14 md:-mb-16 lg:-mb-20 p-2 h-75 w-55 sm:h-64 sm:w-48 md:h-72 md:w-52 lg:h-80 lg:w-60 shadow-xl flex-shrink-0'>
                                <div className='overflow-hidden border-2 h-full w-full rounded-t-full border-[#0d1b2a]'>
                                    <img src={img6} alt="" className='h-full w-full object-cover object-center' />
                                </div>
                            </div>
                            <div className='hostel-arc-3 hidden sm:block bg-[#f0ebd8] rounded-t-full absolute z-0 p-2 h-80 w-64 md:h-96 md:w-80 lg:h-[30rem] lg:w-96 -left-6 sm:-left-8 md:-left-10 lg:left-0 opacity-40 sm:opacity-50 shadow-lg'>
                                <div className='overflow-hidden border-2 h-full w-full rounded-t-full border-[#0d1b2a]'>
                                    <img src={img7} alt="" className='h-full w-full object-cover object-center' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Hostels Grid ── */}
            <section className='hostel-grid w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8'>
                {status==='succeeded'&&hostels.map((hostel) => (
                    <div key={hostel._id} className='hostel-card-anim'>
                        <HostelCard {...hostel} />
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Hostel;
