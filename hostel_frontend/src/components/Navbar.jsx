import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import gsap from "gsap";
import logo from "../assets/logo.png";

const Nav=() =>
{
    const [show, setShow]=useState(true);
    const [lastY, setLastY]=useState(0);
    const [menuOpen, setMenuOpen]=useState(false);

    /* Hide / Show Navbar on Scroll */
    useEffect(() =>
    {
        const controlNavbar=() =>
        {
            setShow(window.scrollY<lastY);
            setLastY(window.scrollY);
        };
        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastY]);

    /* GSAP Intro Animation */
    useEffect(() =>
    {
        const ctx=gsap.context(() =>
        {
            gsap.from(".nav-text", {
                opacity: 0,
                y: -20,
                duration: 1.5,
                stagger: 0.2,
                ease: "power2.inOut",
            });

            gsap.from(".logo", {
                opacity: 0,
                scale: 2,
                duration: 1,
                ease: "bounce.inOut",
            });

            const tl=gsap.timeline();
            tl.from(".logo-text", {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "bounce.inOut",
            })
                .to(".logo", {x: -100, duration: 1}, "<")
                .to(".logo", {x: 0, rotate: 360, duration: 1});
        });

        return () => ctx.revert();
    }, []);

    /* Mobile Menu Animation */
    useEffect(() =>
    {
        if (menuOpen)
        {
            document.body.classList.add("no-scroll");

            gsap.fromTo(
                ".mobile-menu",
                {x: -300, opacity: 0},
                {x: 0, opacity: 1, duration: 0.5}
            );

            gsap.fromTo(
                ".menu-overlay",
                {opacity: 0},
                {opacity: 1, duration: 0.5}
            );
        } else
        {
            document.body.classList.remove("no-scroll");
        }
    }, [menuOpen]);

    const closeMenu=() =>
    {
        gsap.to(".mobile-menu", {
            x: -300,
            opacity: 0,
            duration: 0.4,
        });
        gsap.to(".menu-overlay", {
            opacity: 0,
            duration: 0.4,
            onComplete: () => setMenuOpen(false),
        });
    };

    return (
        <nav>
            <div
                className={`fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 transition-transform duration-500 flex items-center justify-between bg-[#f0ebd8] border-b-2 border-[#0d1b2a] ${show? "translate-y-0":"-translate-y-full"
                    }`}
            >
                {/* Hamburger */}
                <div
                    className="text-2xl sm:text-3xl lg:hidden cursor-pointer text-[#0d1b2a] hover:text-[#0d1b2a]/80 transition-colors"
                    onClick={() => setMenuOpen(true)}
                >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                    </svg>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex text-sm xl:text-base space-x-6 xl:space-x-8">
                    {["/", "/hostel", "/contact"].map((path) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({isActive}) =>
                                isActive
                                    ? "nav-text text-[#0d1b2a] font-bold border-b-2 border-[#0d1b2a] pb-1"
                                    :"nav-text text-[#0d1b2a] hover:text-[#0d1b2a]/70 transition-colors"
                            }
                        >
                            {path==="/"
                                ? "HOME"
                                :path.replace("/", "").toUpperCase()}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu */}
                {menuOpen&&(
                    <>
                        <div
                            className="menu-overlay fixed top-0 left-0 w-full h-screen bg-[#0d1b2a]/80 backdrop-blur-sm z-40"
                            onClick={closeMenu}
                        ></div>

                        <div className="mobile-menu lg:hidden fixed top-0 left-0 w-64 sm:w-72 h-screen bg-[#f0ebd8] border-r-2 border-[#0d1b2a] z-50 p-6 sm:p-8 pt-16 sm:pt-20 flex flex-col gap-6">
                            {["/", "/hostel", "/contact"].map((path) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    onClick={closeMenu}
                                    className={({isActive}) =>
                                        isActive
                                            ? "nav-text text-lg sm:text-xl text-[#0d1b2a] font-bold border-l-4 border-[#0d1b2a] pl-4"
                                            :"nav-text text-lg sm:text-xl text-[#0d1b2a] hover:text-[#0d1b2a]/70 transition-colors pl-4"
                                    }
                                >
                                    {path==="/"? "HOME":path.replace("/", "").toUpperCase()}
                                </NavLink>
                            ))}

                            {/* Close Button */}
                            <div
                                onClick={closeMenu}
                                className="absolute text-2xl sm:text-3xl top-4 sm:top-6 right-4 sm:right-6 cursor-pointer text-[#0d1b2a] hover:text-[#0d1b2a]/70 transition-colors"
                            >
                                <svg className="w-6 h-6 sm:w-7 sm:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                </svg>
                            </div>
                        </div>
                    </>
                )}

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                    <NavLink to="/" className="logo-text flex items-center gap-2 font-bold text-[#0d1b2a] tracking-tight hover:opacity-80 transition-opacity">
                        <img src={logo} alt="AuraLiving Logo" className="logo w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg" />
                        <span className="text-xl sm:text-2xl lg:text-3xl">Aura<span className="opacity-50">Living</span></span>
                    </NavLink>
                </div>

                {/* Empty div for spacing */}
                <div className="w-20 sm:w-24"></div>
            </div>
        </nav>
    );
};

export default Nav;