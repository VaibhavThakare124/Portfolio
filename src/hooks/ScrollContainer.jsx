import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugin exactly once
if (!gsap.core.globals().ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

const ScrollContainer = ({ children, start }) => {
    const containerRef = useRef(null);
    const lenisRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        if (!start) return;

        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2, // Smooth scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.5, // Slower scroll speed for smooth feel
            smoothTouch: false, // Disable on touch devices for better performance
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's raf to GSAP's ticker for synchronization
        const raf = (time) => {
            lenis.raf(time * 1000);
        };
        rafRef.current = raf;
        gsap.ticker.add(raf);

        // Disable GSAP's lag smoothing for better sync
        gsap.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger when images load
        const updateScrollOnLoad = () => {
            ScrollTrigger.refresh();
            lenis.resize();
        };

        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                updateScrollOnLoad();
            } else {
                img.addEventListener('load', updateScrollOnLoad, { once: true });
            }
        });

        // Initial refresh after content is loaded
        const initTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
            lenis.resize();
        }, 100);

        // Handle window resize
        const handleResize = () => {
            ScrollTrigger.refresh();
            lenis.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(initTimeout);
            window.removeEventListener('resize', handleResize);
            images.forEach(img => {
                img.removeEventListener('load', updateScrollOnLoad);
            });

            // Remove Lenis raf from GSAP ticker
            if (rafRef.current) {
                gsap.ticker.remove(rafRef.current);
            }

            // Cleanup Lenis
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
        };
    }, [start]);

    return (
        <main ref={containerRef} id="main-container" style={{width: '100%', minHeight: '100vh'}}>
            {children}
        </main>
    );
};

export default ScrollContainer;