import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugin registered only once
if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const FooterBottom = ({ logoRef, containerRef }) => {
  // Use local refs for animation targets
  const idCharRef = useRef(null);
  const fCharRef = useRef(null);

  useLayoutEffect(() => {
    if (!logoRef.current || !idCharRef.current || !fCharRef.current) return;

    // Fade and move in the whole logo with smoother animation
    const fadeTween = gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: 120, scale: 0.9, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        delay: 0.35,
        ease: "power3.out",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 90%",
          end: "top 75%",
          scrub: 1.5
        }
      }
    );

    // Animate the "id" rotation as you scroll in with smoother easing
    const idTween = gsap.fromTo(
      idCharRef.current,
      { rotation: 0, scale: 0.8 },
      {
        rotation: 270,
        scale: 1,
        duration: 3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 90%",
          end: "top 75%",
          scrub: 1.5
        }
      }
    );

    // Animate the "f" letter using scroll position
    const fCharST = ScrollTrigger.create({
      trigger: fCharRef.current,
      start: "top 85%",
      end: "top 75%",
      scrub: true,
      onLeave: () => {
        // animate out when leaving
        gsap.to(fCharRef.current, {
          rotation: 20,
          duration: 1.2,
          ease: "bounce.out"
        });
      },
      onEnterBack: () => {
        // animate back as you scroll back up
        gsap.to(fCharRef.current, {
          rotation: 0,
          duration: 1.2,
          ease: "bounce.inOut"
        });
      }
    });

    return () => {
      if (fadeTween) fadeTween.kill();
      if (idTween) idTween.kill();
      if (fCharST && fCharST.kill) fCharST.kill();
    };
  }, [logoRef, containerRef]);

  return (
    <div
      data-scroll-section
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
        <div className="flex flex-row items-end">
          <h1>vo</h1>
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
  );
};

export default FooterBottom;