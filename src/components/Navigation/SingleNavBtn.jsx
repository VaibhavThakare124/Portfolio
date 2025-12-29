import React, { useContext, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavbarContext } from "../../context/NavContext";

gsap.registerPlugin(ScrollTrigger);

const SingleNavBtn = () => {
  const logoRef = useRef(null);
  const iconRef = useRef(null);
  const [navOpen, setNavOpen] = useContext(NavbarContext);

  useEffect(() => {
    // Animate logo on page load
    gsap.fromTo(logoRef.current,
      { opacity: 0, x: -30, filter: "blur(5px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    // Animate icon on page load
    gsap.fromTo(iconRef.current,
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div className="absolute top-[25%] lg:top-[40%] left-37 lg:left-0 w-full z-10 flex items-center justify-center lg:gap-[175vh] gap-[195vh] px-20 py-6">
      
      <div
        ref={iconRef}
        onClick={() => {
          setNavOpen(true);
        }}
        className="cursor-pointer absolute flex items-start "
        style={{ transition: "transform 0.3s" }}
        onMouseEnter={e => e.currentTarget.style.transform = 'rotate(90deg)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
      >
        <i className="text-3xl lg:text-6xl ri-add-large-fill"></i>
      </div>
    </div>
  );
};

export default SingleNavBtn;