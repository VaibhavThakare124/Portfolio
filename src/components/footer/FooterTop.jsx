import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterTop = ({ words, hovered, setHovered }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate each paragraph with stagger
    const paragraphs = containerRef.current.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
      gsap.fromTo(p,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    });

    // Animate social links
    const socialLinks = containerRef.current.querySelectorAll('a');
    gsap.fromTo(socialLinks,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 70%",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      data-scroll-section
      className="relative top-0 flex flex-col items-center justify-center mb-20">
      {/* Introductory Text */}
      <div className="w-[85vw] tracking-[1px] leading-8 text-center font-extrabold uppercase flex flex-col">
        <p className="font-[font1] text-[3.9vh]">
          Driven by modern web design and development, I create interfaces that are{" "}
        </p>
        <p className="font-[font1] text-[3.9vh]">
          accessible, responsive, and seamless — blending creative thinking with solid{" "}
        </p>
        <p className="font-[font1] text-[3.9vh]">technical fundamentals.</p>
      </div>

      {/* SOCIAL LINKS — SMOOTH INLINE WORD REVEAL */}
      <div className="flex flex-row top-10 relative gap-6 text-[23px] uppercase font-extrabold font-[font1]">
        {Object.keys(words).map((letter, i) => {
          const { word, link } = words[letter];
          const extra = word.slice(1);

          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <div
                className={`relative cursor-pointer flex items-center
                  transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                  ${hovered === letter ? "pr-[130px]" : "pr-0"}
                `}
                onMouseEnter={() => setHovered(letter)}
                onMouseLeave={() => setHovered("")}
              >
                {/* Main letter */}
                <span className="transition-opacity duration-300 [transition-timing-function:ease-out]">
                  {letter}
                </span>

                {/* Smooth inline reveal */}
                <span
                  className={`
                    ml-1 inline-block whitespace-nowrap overflow-hidden
                    transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
                    ${hovered === letter ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"}
                  `}
                >
                  {extra}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterTop;