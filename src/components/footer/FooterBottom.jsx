import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterBottom = ({ logoRef }) => {
  const idCharRef = useRef(null);
  const fCharRef = useRef(null);

  useLayoutEffect(() => {
    if (!logoRef.current || !idCharRef.current || !fCharRef.current) return;

    
    gsap.fromTo(
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
          end: "top 85%",
          scrub: 1.5,
        }
      }
    );

    
    gsap.fromTo(
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
          end: "top 85%",
          scrub: 1.5,
        }
      }
    );

    
    ScrollTrigger.matchMedia({
      "(min-width: 769px)": () => {
        const fCharST = ScrollTrigger.create({
          trigger: logoRef.current,
          start: "top 90%",
          end: "top 86.5%",
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

        return () => {
          fCharST.kill();
        };
      },

      "(max-width: 768px)": () => {
        const fCharST = ScrollTrigger.create({
          trigger: logoRef.current,
          start: "top 85%",
          end: "top 80%",
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

        return () => {
          fCharST.kill();
        };
      }
    });
    

    
  }, []);

  return (
    <div
      ref={logoRef}
      className="relative flex flex-col items-center justify-end px-4 top-13 lg:top-43"
    >
      <div
        className="
          flex flex-row lg:flex-row
          items-center lg:items-center
          text-[9vh] lg:text-[40vh]
          font-bold
          tracking-tighter
          uppercase
          font-[font1]
          text-white
          leading-none
        "
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
        }}
      >
        {/* VOID */}
        <div className="flex items-end">
          <h1 className="leading-none">vo</h1>
          <h1
            ref={idCharRef}
            className="ml-2 leading-none inline-block"
          >
            id
          </h1>
        </div>

        {/* FORM */}
        <div className="flex items-end mt-4 lg:mt-0 lg:ml-10">
          <h1
            ref={fCharRef}
            className="leading-none inline-block"
          >
            f
          </h1>
          <h1 className="leading-none">orm</h1>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
