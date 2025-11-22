// AnimatedLine.js
import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedLine = ({ text }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const textElement = textRef.current;
        if (!textElement) return;

        // Split text into spans
        const letters = text.split('');
        textElement.innerHTML = letters.map(letter =>
            `<span style="display:inline-block; color: #666666; opacity: 0.6; filter: blur(1.5px); transform: translateY(20px);">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');

        const spans = textElement.querySelectorAll('span');

        const animation = gsap.to(spans, {
            scrollTrigger: {
                trigger: textElement,
                start: "top 80%",
                end: "bottom 70%",
                scrub: 1.5, // Smoother scrub
                // markers: true,
            },
            color: "#ffffff",
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: {
                each: 0.02, // Faster stagger for smoother effect
                ease: "power2.out",
            },
            duration: 1.5,
            ease: "power3.out", // Smoother easing
        });

        // Store animation reference for cleanup
        textElement._gsapAnimation = animation;

        return () => {
            if (textElement._gsapAnimation?.scrollTrigger) {
                textElement._gsapAnimation.scrollTrigger.kill();
            }
        };
    }, [text]);

    return (
        <span ref={textRef} className="block text-[#666666]">
            {text}
        </span>
    );
};

export default AnimatedLine;