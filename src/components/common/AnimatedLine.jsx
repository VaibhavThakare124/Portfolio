import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedLine = ({ text }) => {
  const textRef = useRef(null);
  const mm = useRef(null);
  const tween = useRef(null);
  const originalHTML = useRef("");

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Save original content
    originalHTML.current = el.innerHTML;

    // Build split markup
    const words = text.split(" ");
    el.innerHTML = words
      .map(word => {
        const chars = word
          .split("")
          .map(
            char =>
              `<span class="char" style="display:inline-block; opacity:0.6; transform:translateY(20px)">${char}</span>`
          )
          .join("");
        return `<span class="word" style="display:inline-block; white-space:nowrap;">${chars}</span>`;
      })
      .join(" ");

    const chars = el.querySelectorAll(".char");

    // MatchMedia reference
    mm.current = ScrollTrigger.matchMedia({

      
      "(min-width: 769px)": () => {
        tween.current = gsap.to(chars, {
          color: "#ffffff",
          opacity: 1,
          y: 0,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 70%",
            scrub: 1.2,
          },
        });
      },

      
      "(max-width: 768px)": () => {
        tween.current = gsap.to(chars, {
          color: "#ffffff",
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true, 
          },
        });
      },
    });

    return () => {
      // Kill tween
      if (tween.current) {
        tween.current.kill();
        tween.current = null;
      }

      // Kill matchMedia
      if (mm.current) {
        mm.current.kill();
        mm.current = null;
      }

      // Restore original text
      el.innerHTML = originalHTML.current;
    };
  }, [text]);

  return (
    <div ref={textRef} className="text-[#666666] leading-tight">
      {text}
    </div>
  );
};

export default AnimatedLine;
