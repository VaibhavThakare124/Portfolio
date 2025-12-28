import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const ScrollContainer = ({ children, start }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const isMobileViewport = window.innerWidth <= 768;

    // 👉 MOBILE / SMALL VIEWPORT: native scroll ONLY
    if (isMobileViewport) {
      ScrollTrigger.refresh();
      return;
    }

    // 👉 DESKTOP: enable Lenis
    const lenis = new Lenis({
      duration: 0.8,                 // responsive, not cinematic
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,             // DO NOT slow scroll
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP
    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    rafRef.current = raf;
    gsap.ticker.add(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    // Resize handler (throttled by browser, not spammy)
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        gsap.ticker.remove(raf);
        lenis.destroy();
        ScrollTrigger.refresh();
      } else {
        ScrollTrigger.refresh();
        lenis.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.kill();
    };
  }, [start]);

  return (
    <main style={{ width: "100%", minHeight: "100vh" }}>
      {children}
    </main>
  );
};

export default ScrollContainer;
