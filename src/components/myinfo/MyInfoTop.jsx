import React from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedLine from '../common/AnimatedLine'; // Ensure the path is correct
import mySign from '../../assets/mySign.png';



gsap.registerPlugin(ScrollTrigger);

const MyInfoTop = () => {
    // The full paragraph, logically split into three lines
    const line1 = "Shaping digital interfaces where design and code converge";
    const line2 = "Precise, adaptive, and born from the void.";
    const line3 = "Each interaction a pulse of light Redefining the";
    const line4 = "digital experience.";

    return (
        // Restored original outer container styles
        <div className="h-screen w-full flex flex-col left-0 justify-center items-center gap-[20px] mx-10">
            {/* 
              - Restored original inner container and font styles.
              - `leading-20` is used here to control the spacing between lines.
              - `text-center` ensures the lines are centered within the 70% width container.
            */}
            <div 
                className="w-full text-center leading-15 text-[6.5vh] font-[font4] uppercase tracking-[-0.03em] font-extrabold"
            >
                <AnimatedLine text={line1} />
                <AnimatedLine text={line2} />
                <AnimatedLine text={line3} />
                <AnimatedLine text={line4} />
            </div>

            <div>
            
            <img src={mySign} alt="My Signature" className="w-[12vw] h-[7vw] top-10 mt-50 mx-auto bg-transparent opacity-80" />
            </div>
            
        </div>
    );
}

export default MyInfoTop;




// const line1 = "Shaping digital interfaces where design and code ";
// const line2 = "converge —precise, adaptive, and born from the void.";
// const line3 = "Each interaction a pulse of light redefining the digital experience.";