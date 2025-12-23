import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import ProjectImg1 from "../assets/ProjectImages/SolarSystem.png";
import ProjectImg2 from "../assets/ProjectImages/ThirtySix.png";
import ProjectImg3 from "../assets/ProjectImages/ToGoodco.png";
import ProjectImg4 from "../assets/ProjectImages/Zajno.png";

const projects = [
  {
    src: ProjectImg1,
    alt: "Solar System project",
    className: "w-[63vh] h-[35vh]",
  },
  {
    src: ProjectImg2,
    alt: "ThirtySix project",
    className: "relative left-[30%] w-[63vh] h-[35vh]",
  },
  {
    src: ProjectImg3,
    alt: "ToGoodco project",
    className: "relative right-[30%] w-[63vh] h-[35vh]",
  },
  {
    src: ProjectImg4,
    alt: "Zajno project",
    className: "relative left-[15%] w-[63vh] h-[35vh]",
  },
];

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imagesWrapperRef = useRef(null);

  useGSAP(
    () => {
      // Fix: The textRef stays visible after scroll (doesn't disappear instantly when pin ends)
      // Animate text container with smooth fade and scale, but don't fade it OUT at end,
      // so only initial from opacity 0/y/scale => visible, and stays visible after pinning.
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 10%",
            endTrigger: imagesWrapperRef.current,
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            // Do NOT set pinSpacing: false to keep visual order
            // No toggleActions so it never fades out
          },
          // Do not set toggleActions!
        }
      );

      // Animate "Featured Projects" text with letter stagger
      const featuredText = textRef.current?.querySelector(".TopLeft");
      if (featuredText) {
        const words = featuredText.querySelectorAll("h1");
        gsap.fromTo(
          words,
          { opacity: 0, y: 30, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 20%",
              end: "top 10%",
              scrub: 1,
            },
          }
        );
      }

      // Animate description text
      const descText = textRef.current?.querySelector(".TopRight");
      if (descText) {
        gsap.fromTo(
          descText,
          { opacity: 0, x: 50, filter: "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 20%",
              end: "top 10%",
              scrub: 1,
            },
          }
        );
      }

      // Animate each project image in on scroll with smoother animation
      gsap.utils.toArray(".project-image").forEach((img, index) => {
        gsap.fromTo(
          img,
          {
            opacity: 0,
            y: 120,
            scale: 0.9,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      data-scroll-section
      ref={containerRef}
      className="w-screen min-h-screen relative flex flex-col justify-center items-center"
    >
      <div
        ref={textRef}
        className="text-container flex flex-row justify-center gap-[100vh] top-[20vh] items-center px-20 py-10 w-full z-10 max-sm:flex-col max-sm:gap-10 max-sm:px-6"
      >
        <div className="TopLeft flex flex-col font-[font1] font-bold tracking-[-0.03em] leading-20 text-[13vh] max-sm:text-[14vw]">
          <h1>Featured</h1>
          <h1>Projects</h1>
        </div>
        <div className="TopRight font-[font4] font-bold text-[23px] w-[20%] leading-7 max-sm:w-full max-sm:text-base max-sm:pr-0">
          <p>
            A selection of websites I've crafted — combining clarity, elegance,
            and thoughtful motion.
          </p>
        </div>
      </div>

      <div
        ref={imagesWrapperRef}
        className="images-wrapper flex flex-col z-99 gap-30 justify-center items-center w-full px-20 py-10 mt-[40vh] max-sm:px-6 max-sm:gap-10"
        style={{ minHeight: "400vh" }}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`project-image rounded-3xl object-cover flex ${project.className} max-sm:w-full max-sm:aspect-[16/9]`}
          >
            <img
              src={project.src}
              alt={project.alt}
              className="rounded-[10px] object-fill w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
