import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import { NavbarContext } from "../../context/NavContext";

// Navigation items
const navigationItems = [
  { name: "Home", href: "/", description: "[0]" },
  { name: "About", href: "/About", description: "[1]" },
  { name: "Work", href: "/Work", description: "[2]" },
  { name: "Contact", href: "/Contact", description: "[3]" },
];

const STAGGER = 0.035;

// TextRoll Animation Component
const TextRoll = ({ children, className = "", center = false }) => {
  const text =
    children == null
      ? ""
      : typeof children === "string"
      ? children
      : String(children);

  if (!text) return null;

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative inline-block align-middle ${className}`}
      style={{
        lineHeight: "1",
        display: "inline-block",
        overflow: "hidden",
        padding: "0.1em 0", // fixes top/bottom clipping
      }}
    >
      {/* top row */}
      <span aria-hidden="true" className="block" style={{ willChange: "transform" }}>
        {text.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (text.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={`top-${i}-${l}-${text.length}`}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              style={{ willChange: "transform" }}
            >
              {l}
            </motion.span>
          );
        })}
      </span>

      {/* bottom row */}
      <span
        className="absolute inset-0 block pointer-events-none"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        {text.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (text.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={`bottom-${i}-${l}-${text.length}`}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              style={{ willChange: "transform" }}
            >
              {l}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};

// Fullscreen Navigation Component
const FullScreenNav = () => {
  const navCloseRef = useRef(null);
  const [navOpen, setNavOpen] = useContext(NavbarContext);

  return (
    <motion.div
      id="fullscreennav"
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={
        navOpen
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-screen h-screen bg-[#0d0d0d] z-99"
    >
      {/* Top Bar */}
      <div className="absolute flex flex-row justify-between items-center top-[30px] left-[50px] right-[50px]">
        {/* Logo */}
        <div className="text-3xl uppercase items-start flex flex-row font-[font1] font-semibold">
          <span className="text-[#c93b10]">void</span>from
          <div className="top-0 left-0 flex items-start">
            <i className="text-[15px] ri-add-large-fill"></i>
          </div>
        </div>

        {/* Close Button */}
        <div
          onClick={() => setNavOpen(false)}
          onMouseEnter={() => {
            if (navCloseRef.current) {
              navCloseRef.current.style.opacity = "1";
              navCloseRef.current.style.transform = "translateX(0)";
            }
          }}
          onMouseLeave={() => {
            if (navCloseRef.current) {
              navCloseRef.current.style.opacity = "0";
              navCloseRef.current.style.transform = "translateX(2rem)";
            }
          }}
          className="flex flex-row items-center justify-center gap-9 cursor-pointer"
        >
          <div
            ref={navCloseRef}
            className="text-[22px] relative opacity-0 translate-x-8 transition-all duration-500 whitespace-nowrap text-white"
            style={{ transitionProperty: "opacity, transform" }}
          >
            Close
          </div>
          <div
            className="transition-transform duration-300 hover:rotate-90 flex items-center justify-center"
            style={{ transform: "rotate(45deg)" }}
          >
            <i className="text-5xl ri-add-large-fill text-white" />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col absolute object-cover overflow-hidden items-start justify-center h-full gap-5 text-white m-0 p-0 left-40 list-none">
        {navigationItems.map((item) => (
          <li
            key={`nav-${item.name}`}
            className="relative flex cursor-pointer flex-col h-[52px] items-center justify-center overflow-hidden"
          >
            <a href={item.href} className="no-underline" tabIndex={0} aria-label={item.name}>
              <TextRoll
                center
                className="font-[font1] items-center overflow-hidden justify-center text-5xl sm:text-5xl md:text-[7.5vh] font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors hover:text-[#c93b10]"
              >
                {item.name}
              </TextRoll>
            </a>
          </li>
        ))}
      </ul>

      {/* Contact Info */}
      <div className="flex flex-row text-white right-50 bottom-50 absolute gap-30 font-[font4]">
        <div className="flex flex-col">
          <h5 className="text-[2.8vh]">Phone</h5>
          <a href="tel:+919373899825">(+91)9373899825</a>
        </div>
        <div className="flex flex-col">
          <h5 className="text-[2.8vh]">Email</h5>
          <a href="mailto:thakarevaibhav@gmail.com">thakarevaibhav@gmail.com</a>
        </div>
      </div>

      {/* Socials */}
      <div className="flex flex-col bottom-10 uppercase right-10 gap-5 absolute">
        <h3 className="text-white text-[3vh] font-[font4]">Socials</h3>
        <div className="flex flex-row gap-15 text-[2.8vh] font-[font4]">
          {/* For smooth animated underline, use group and after pseudo for each link */}
          {[
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/vaibhavthakare101",
            },
            {
              label: "X/Twitter",
              href: "https://x.com/IMxVaibhavT",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/vaibhav_thakare_2.o/",
            },
            {
              label: "GitHub",
              href: "https://github.com/VaibhavThakare124",
            },
          ].map((item, idx) => (
            <div key={item.label} className="flex items-center">
              <a
                href={item.href}
                className="relative group transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="transition-colors duration-200"
                >
                  {item.label}
                </span>
                <span
                  className="
                    pointer-events-none
                    absolute left-0 -bottom-0.5 w-full h-[2px]
                    bg-[#c93b10]
                    scale-x-0
                    group-hover:scale-x-100
                    transition-transform duration-300
                    origin-left
                  "
                />
              </a>
              <i className="ri-arrow-right-up-line ml-1"></i>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FullScreenNav;
