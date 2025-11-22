import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SingleNavBtn from '../components/Navigation/SingleNavBtn';

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
    const bottomTexts = bottomTextsRef.current?.children || [];
    gsap.fromTo(
      bottomTexts,
      { opacity: 0, y: 30, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: bottomTextsRef.current,
          start: "top 90%",
          end: "top 80%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-section
      className="h-screen w-screen mx-10 py-1 relative"
    >

      <div className="absolute top-35 left-[135vh] z-50">
        <SingleNavBtn />
      </div>


      <div className='relative flex flex-col items-start justify-center top-5   w-full z-10'>
        
        <div className="h-[32vh] relative w-screen flex flex-col items-center justify-center text-center">
          
          <div
            className="flex flex-row items-end text-[40vh] font-bold tracking-tighter uppercase font-[font1] text-[#ffffff] relative z-10"
            style={{
              maskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
            }}
          >
            <div className="flex flex-row items-end">
              <h1 ref={voRef}>vo</h1>
              <h1
                ref={idCharRef}
                className="idchar rotate-0 text-[40vh] relative ml-2"
                style={{ display: "inline-block" }}
              >
                id
              </h1>
            </div>

            <div className="flex flex-row items-end ml-10">
              <h1
                ref={fCharRef}
                className="fchar"
                style={{ display: "inline-block" }}
              >
                f
              </h1>
              <h1>o</h1>
              <h1>r</h1>
              <h1>m</h1>
            </div>
          </div>

        </div>
         
         
          <div
            ref={paragraphRef}
            className="relative top-20 w-[35%] left-25 z-40"
          >
            <p className="text-[#e0dbdb] text-[20px] font-[font2] text-left">
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
          className="ml-0 text-[20px] font-[font2]"
        >
          Scroll To Explore
        </h1>

        <div ref={bottomTextsRef} className="flex flex-row gap-6">
          <h1 className="text-[18px]">Creative Web Development</h1>
          <div className="bg-white w-0.5 h-8"></div>
          <h1 className="text-[18px]">Animated Interfaces</h1>
          <div className="bg-white w-0.5 h-8"></div>
          <h1 className="text-[18px]">Immersive 3D Experiences</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;