import React, { useContext, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavbarContext } from "../../context/NavContext";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const logoRef = useRef(null);
  const iconRef = useRef(null);
  const navbarRef = useRef(null);

  // get navOpen setter for opening fullscreen menu
  const navContext = useContext(NavbarContext);
  const [ , setNavOpen] = navContext || [false, () => {}];

  // Animate navbar and its children
  useEffect(() => {
    // Fade in navbar after scrolling past the first data-scroll-section
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: "[data-scroll-section]:first-of-type",
            start: "bottom top",
            end: "+=100",
            toggleActions: "play none none reverse",
            scrub: false,
            markers: false,
            onEnter: () => navbarRef.current && (navbarRef.current.style.pointerEvents = "all"),
            onLeaveBack: () => navbarRef.current && (navbarRef.current.style.pointerEvents = "none"),
          },
        }
      );
    }
    // Animate logo
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -30, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
    // Animate icon
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 "
      style={{
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        padding: "15px"
      }}
    >
      {/* Logo */}
      <div
        ref={logoRef}
        className="text-2xl sm:text-3xl uppercase items-start flex flex-row font-[font1] font-semibold text-white"
      >
        <span className="text-[#c93b10]">void</span>from
        <div className="top-0 left-0 flex items-start">
          <i className="text-[15px] ri-add-large-fill text-white"></i>
        </div>
      </div>

      {/* Icon button */}
      <div
        ref={iconRef}
        onClick={() => setNavOpen && setNavOpen(true)}
        className="cursor-pointer flex items-center justify-center text-white"
        style={{ transition: "transform 0.3s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "rotate(90deg)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "rotate(0deg)")}
      >
        <i className="text-3xl sm:text-4xl ri-add-large-fill"></i>
      </div>
    </div>
  );
};

export default Navbar;
