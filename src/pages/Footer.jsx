import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  // refs for hover gsap
  const btnRefs = useRef([]);
  const labelRefs = useRef([]);
  const shortRefs = useRef([]);

  // Helper to set refs for dynamic list
  const setBtnRef = (el, i) => {
    btnRefs.current[i] = el;
  };
  const setLabelRef = (el, i) => {
    labelRefs.current[i] = el;
  };
  const setShortRef = (el, i) => {
    shortRefs.current[i] = el;
  };

  useGSAP(
    () => {
      if (!logoRef.current) return;

      // Animate logo
      gsap.fromTo(
        logoRef.current,
        {
          opacity: 0,
          y: 120,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 90%",
            end: "top 75%",
            scrub: 0.5,
          },
        }
      );
      gsap.fromTo(
        ".idchar",
        { rotation: 0 },
        {
          rotation: 270,
          ease: "power2.inOut",
          duration: 1.4,
          delay: 5,
          scrollTrigger: {
            trigger: ".idchar",
            start: "top 72%",
            end: "top 55%",
            scrub: 1,
            // markers: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: ".fchar",
        start: "top 85%",
        end: "top 75%",
        scrub: 1,
        // markers: true,
        onLeave: self => {
          setTimeout(() => {
            gsap.to(".fchar", {
              rotation: 22,
              duration: 2,
              ease: "bounce.out",
              onComplete: () => {
                gsap.to(".fchar", {
                  rotation: 12,
                  duration: 2,
                  ease: "bounce.inOut",
                });
              },
            });
          }, 400);
        },
        onEnterBack: self => {
          gsap.to(".fchar", {
            rotation: 0,
            duration: 2,
            ease: "bounce.inOut",
          });
        },
      });

      // Clean up: reset hover states
      return () => {
        gsap.globalTimeline.clear();
      };
    },
    { scope: containerRef }
  );

  // Social links config
  const socialLinks = [
    {
      label: "LinkedIn",
      short: "L",
      href: "https://www.linkedin.com/in/vaibhavthakare101",
      minWidth: "1.65ch",
    },
    {
      label: "X/Twitter",
      short: "X/T",
      href: "https://x.com/IMxVaibhavT",
      minWidth: "2.4ch",
    },
    {
      label: "Instagram",
      short: "I",
      href: "https://www.instagram.com/vaibhav_thakare_2.o/",
      minWidth: "1.5ch",
    },
    {
      label: "Github",
      short: "G",
      href: "https://github.com/VaibhavThakare124",
      minWidth: "1.5ch",
    },
  ];

  // GSAP hover logic for social links (for easy reading/writing)
  const handleSocialHover = (idx) => {
    // Animate short label out, full label in
    gsap.to(shortRefs.current[idx], {
      x: 50,
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(labelRefs.current[idx], {
      x: 0,
      opacity: 1,
      pointerEvents: "all",
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };
  const handleSocialOut = (idx) => {
    // Animate full label out, short label in
    gsap.to(shortRefs.current[idx], {
      x: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(labelRefs.current[idx], {
      x: 40,
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.in",
      overwrite: true,
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center"
    >
      {/* <div className='flex flex-row relative justify-center items-center tracking-tighter top-50'>
        <div className='absolute right-6  z-99  flex'>
          <h1 className='uppercase text-9xl  font-[font4] text-white'>o</h1>
        </div>
        <div className='  absolute  flex'>
          <h1 className='uppercase text-9xl  font-[font4] text-white'>o</h1>
        </div>
      </div> */}

      <div className="relative top-0 flex flex-col items-center justify-center  mb-20">
        <div className="w-[85vw] tracking-[1px] leading-8 text-center font-extrabold uppercase flex flex-col">
          <p className="font-[font1] text-[3.9vh]">
            Driven by modern web design and development, I create interfaces that are{" "}
          </p>
          <p className="font-[font1] text-[3.9vh]">
            accessible, responsive, and seamless — blending creative thinking with solid{" "}
          </p>
          <p className="font-[font1] text-[3.9vh]">
            technical fundamentals.
          </p>
        </div>

        {/* Social links using GSAP for hover effect */}
        <div className="flex flex-row top-10 relative gap-6 text-[23px] uppercase font-extrabold font-[font1]">
          {socialLinks.map(({ href, short, label, minWidth }, idx) => (
            <button
              // Use button for accessibility and tab focus; style as non-button visually
              key={label}
              ref={(el) => setBtnRef(el, idx)}
              tabIndex={0}
              aria-label={label}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                minWidth,
                outline: "none",
                cursor: "pointer",
              }}
              className="relative flex flex-col items-center overflow-y-visible h-[2.5em] group focus:outline-none"
              onClick={() => {
                window.open(href, "_blank");
              }}
              type="button"
              onMouseEnter={() => handleSocialHover(idx)}
              onFocus={() => handleSocialHover(idx)}
              onMouseLeave={() => handleSocialOut(idx)}
              onBlur={() => handleSocialOut(idx)}
            >
              {/* Short char always visible when not hovered */}
              <span
                ref={(el) => setShortRef(el, idx)}
                style={{
                  display: "block",
                  position: "relative",
                  transition: "none", // gsap will animate
                }}
                className=""
              >
                {short}
              </span>
              {/* Show label in center X only when hovered */}
              <span
                ref={(el) => setLabelRef(el, idx)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)", // initial x offset by gsap
                  opacity: 0,
                  pointerEvents: "none",
                  transition: "none", // gsap will animate
                }}
                className=""
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={logoRef}
        className="relative flex flex-col items-center justify-end top-43"
      >
        <div
          className="flex flex-row items-end text-[40vh] font-bold tracking-tighter uppercase font-[font1] text-[#ffffff] relative z-10"
          style={{
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
          }}
        >
          {/* "vo" and rotated "id" grouped together, side-by-side as in original but tidier */}
          <div className="flex flex-row items-end">
            <h1 className="">vo</h1>
            <h1 className="idchar rotate-0 text-[40vh] relative ml-2">id</h1>
          </div>
          {/* Some spacing between "void" and "form" */}
          <div className="flex flex-row items-end ml-10">
            <h1 className="fchar ">f</h1>
            <h1>o</h1>
            <h1 className="relative">r</h1>
            <h1>m</h1>
          </div>
        </div>
      </div>

      {/* <div className='flex flex-row justify-center items-center gap-[120vh] p-10'>
        <div>
            <h1>Quick Links</h1>
            <div className='flex flex-row gap-10'>
               <ul className='flex flex-row gap-6'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Contact</li>
                </ul> 
            </div>
            
        </div>

        <div className='flex flex-col w-[45vh] items-end '>
            <h1 className='flex items-end right-0'>Networks</h1>
            <div className='flex flex-row gap-6'>
               <a href="https://www.linkedin.com/in/vaibhavthakare101">LinkedIn</a>
               <a href="https://x.com/IMxVaibhavT">X/Twitter</a>
               <a href="https://www.instagram.com/vaibhav_thakare_2.o/">Instagram</a>
               <a href="https://github.com/VaibhavThakare124">GitHub</a>
            </div>
            
        </div>

      </div> */}
    </div>
  );
};

export default Footer;
