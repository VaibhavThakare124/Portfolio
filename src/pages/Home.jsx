import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SingleNavBtn from '../components/Navigation/SingleNavBtn';
import Navbar from '../components/Navigation/Navbar';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  // Using distinct refs for each animated main letter/group for correct GSAP animation
  const voRef = useRef(null);
  const idCharRef = useRef(null);
  const fCharRef = useRef(null);

  const paragraphRef = useRef(null);
  const scrollTextRef = useRef(null);
  const bottomTextsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate "vo" text
    gsap.fromTo(
      voRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    // Animate "id" text with rotation
    gsap.fromTo(
      idCharRef.current,
      { opacity: 0, rotation: -90, scale: 0.8 },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    // Animate "f" letter (bounce on scroll, in-out style)
    if (fCharRef.current) {
      ScrollTrigger.create({
        trigger: fCharRef.current,
        start: "top 85%",
        end: "top 75%",
        scrub: true,
        onLeave: () => {
          gsap.to(fCharRef.current, {
            rotation: 20,
            duration: 1.2,
            ease: "bounce.out",
          });
        },
        onEnterBack: () => {
          gsap.to(fCharRef.current, {
            rotation: 0,
            duration: 1.2,
            ease: "bounce.inOut",
          });
        },
      });
    }

    // Animate paragraph text
    gsap.fromTo(
      paragraphRef.current,
      { opacity: 0, x: -50, filter: "blur(10px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      }
    );

    // Animate "Scroll To Explore" text
    gsap.fromTo(
      scrollTextRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollTextRef.current,
          start: "top 90%",
          end: "top 80%",
          scrub: 1,
        },
      }
    );

    // Animate bottom texts with stagger
    // Responsive handling for bottom texts animation
    let bottomTexts = [];
    if (bottomTextsRef.current) {
      // On mobile, animate as a single block for smoother performance
      if (window.innerWidth <= 640) {
        bottomTexts = [bottomTextsRef.current];
      } else {
        bottomTexts = bottomTextsRef.current.children;
      }
    }

    gsap.fromTo(
      bottomTexts,
      { opacity: 0, y: 30, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        stagger: window.innerWidth > 640 ? 0.15 : 0,
        scrollTrigger: {
          trigger: bottomTextsRef.current,
          // Responsive start and end, but keep original as fallback/default
          start: window.innerWidth <= 640 ? "top 85%" : "top 90%",
          end: window.innerWidth <= 640 ? "top 75%" : "top 85%",
          scrub: 1,
          // markers: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-section
      className="h-screen w-screen mx-10 py-1 relative overflow-hidden px-4 sm:px-6 md:px-10"
    >
      <div className="absolute top-35 left-[135vh] z-50 max-sm:static max-sm:self-end">
        <SingleNavBtn />
      </div>

      

      <div className="relative flex flex-col items-start justify-center top-2 w-full z-10 gap-10 max-sm:items-center max-sm:text-center">
        <div className="h-[32vh] relative w-screen flex flex-col items-center justify-center text-center">
          <div
            className="
            flex flex-wrap lg:flex-wrap
            justify-center lg:justify-center
            items-center
            lg:text-[18vw] 
            text-[17vw]
            font-bold tracking-tighter uppercase
            font-[font1] text-white
            leading-[0.9]
            "
            style={{
              maskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
            }}
          >
            <div className="flex flex-row items-end">
              <h1 ref={voRef} className="leading-none">
                vo
              </h1>
              <h1
                ref={idCharRef}
                className="idchar rotate-0"
                style={{ display: "inline-block" }}
              >
                id
              </h1>
            </div>

            <div className="flex flex-row items-end ml-10 max-sm:ml-4">
              <h1
                ref={fCharRef}
                className="fchar leading-none"
                style={{ display: "inline-block" }}
              >
                f
              </h1>
              <h1 className="leading-none">o</h1>
              <h1 className="leading-none">r</h1>
              <h1 className="leading-none">m</h1>
            </div>
          </div>
        </div>

        <div
          ref={paragraphRef}
          className="relative top-20 w-[35%] left-25 z-40 max-sm:w-[90%] max-sm:left-0 max-sm:top-10 max-sm:text-center"
        >
          <p className="text-[#e0dbdb] text-[20px] font-[font2] text-left max-sm:text-base max-sm:text-center">
            Designed & Developed by{" "}
            <span className="font-bold">VAIBHAV THAKARE</span> — Blending
            design, code, and motion into intuitive experiences.
          </p>
        </div>
      </div>

      <div
        className="relative flex flex-row justify-between items-end"
        style={{
          position: "absolute",
          bottom: "5%",
          left: "2.5%",
          right: "2.5%",
          width: "95%",
        }}
      >
        <h1
          ref={scrollTextRef}
          className="ml-0 w-[90px] lg:w-auto text-[10px] lg:text-[20px] font-[font2] max-sm:text-base max-sm:text-center"
        >
          Scroll To Explore
        </h1>

        <div ref={bottomTextsRef} className="flex flex-row gap-1 lg:gap-6 max-sm:flex-col max-sm:items-center">
          <h1 className="text-[15px] lg:text-[18px]">Creative Web Dev</h1>
          <div className="bg-white w-0.5 h-8 max-sm:w-8 max-sm:h-0.5"></div>
          <h1 className="text-[15px] lg:text-[18px]">Animated Interfaces</h1>
          <div className="bg-white w-0.5 h-8 max-sm:w-8 max-sm:h-0.5"></div>
          <h1 className="text-[15px] lg:text-[18px]">Immersive 3D Experiences</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;