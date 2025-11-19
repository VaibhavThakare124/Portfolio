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
     
      gsap.to(textRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 10%",
          endTrigger: imagesWrapperRef.current,
          end: "bottom bottom",
          scrub: true,
          pin: true,
        },
      });

      // Animate each project image in on scroll
      gsap.utils.toArray(".project-image").forEach((img) => {
        gsap.from(img, {
          opacity: 0,
          y: 120,
          duration: 2,
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-screen min-h-screen relative flex flex-col justify-center items-center"
    >
      <div
        ref={textRef}
        className="text-container flex flex-row justify-center gap-[100vh] top-[20vh] items-center px-20 py-10 w-full z-10"
      >
        <div className="TopLeft flex flex-col font-[font1] font-bold tracking-[-0.03em] leading-20 text-[13vh]">
          <h1>Featured</h1>
          <h1>Projects</h1>
        </div>
        <div className="TopRight font-[font4] font-bold text-[23px] w-[20%] leading-7">
          <p>
            A selection of websites I've crafted — combining clarity, elegance,
            and thoughtful motion.
          </p>
        </div>
      </div>

      <div
        ref={imagesWrapperRef}
        className="images-wrapper flex flex-col z-99 gap-30 justify-center items-center w-full px-20 py-10 mt-[40vh]"
        style={{ minHeight: "400vh" }}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`project-image rounded-3xl object-cover flex ${project.className}`}
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
