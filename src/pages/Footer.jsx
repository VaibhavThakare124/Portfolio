import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterTop from "../components/footer/FooterTop";
import FooterBottom from "../components/footer/FooterBottom";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  const [hovered, setHovered] = useState("");

  // WORD MAP WITH LINK URLS (Kept in parent)
  const words = {
    L: {
      word: "LINKEDIN",
      link: "https://www.linkedin.com/in/vaibhavthakare101",
    },
    X: {
      word: "TWITTER",
      link: "https://x.com/IMxVaibhavT",
    },
    I: {
      word: "INSTAGRAM",
      link: "https://www.instagram.com/vaibhav_thakare_2.o/",
    },
    G: {
      word: "GITHUB",
      link: "https://github.com/VaibhavThakare124",
    },
  };

  return (
    <div
      data-scroll-section
      ref={containerRef}
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center"
    >
      <FooterTop
        words={words}
        hovered={hovered}
        setHovered={setHovered}
      />
      
      {/* FooterBottom gets the refs needed for its internal GSAP logic */}
      <FooterBottom 
        logoRef={logoRef} 
        containerRef={containerRef} 
      />
    </div>
  );
};

export default Footer;