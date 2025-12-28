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

        // 1. Split text into words first
        const words = text.split(" ");

        // 2. Build HTML: Wrap words in a span that prevents breaking, then wrap chars inside
        textElement.innerHTML = words.map(word => {
            const chars = word.split('').map(char => 
                `<span class="char" style="display:inline-block; color: #666666; opacity: 0.6; filter: blur(1.5px); transform: translateY(20px);">${char}</span>`
            ).join('');
            
            // Wrap the word to keep it together. 
            // We add a trailing space ( ) to ensure spacing between words works naturally.
            return `<span class="word" style="display:inline-block; white-space:nowrap;">${chars}</span>`;
        }).join(' '); // Join words with a real space for natural flow

        // 3. Select ONLY the characters (not the word wrappers)
        const chars = textElement.querySelectorAll('.char');

        const animation = gsap.to(chars, {
            scrollTrigger: {
                trigger: textElement,
                start: "top 80%",
                end: "bottom 70%",
                scrub: 1.5,
            },
            color: "#ffffff",
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: {
                each: 0.02,
                ease: "power2.out",
            },
            duration: 1.5,
            ease: "power3.out",
        });

        textElement._gsapAnimation = animation;

        return () => {
            if (textElement._gsapAnimation?.scrollTrigger) {
                textElement._gsapAnimation.scrollTrigger.kill();
            }
        };
    }, [text]);

    return (
        <div ref={textRef} className="text-[#666666] leading-tight">
            {/* We use a div here instead of span to ensure block behavior 
               which handles word-wrapping better in responsive layouts 
            */}
            {text}
        </div>
    );
};

export default AnimatedLine;