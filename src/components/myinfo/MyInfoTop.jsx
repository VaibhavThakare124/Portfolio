import React from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedLine from '../common/AnimatedLine'; 
import mySign from '../../assets/mySign.png';



gsap.registerPlugin(ScrollTrigger);

const MyInfoTop = () => {
    // The full paragraph, logically split into three lines
    const line1 = "Shaping digital interfaces where design and code converge Precise, adaptive, and born from the void. Each interaction a pulse of light Redefining the digital experience.";
    // const line2 = "Precise, adaptive, and born from the void.";
    // const line3 = "Each interaction a pulse of light Redefining the";
    // const line4 = "digital experience.";

    return (
        // Restored original outer container styles
        <div data-scroll-section className="h-screen w-full flex flex-col left-0 justify-center items-center gap-[20px] mx-10 px-4 sm:px-6 md:px-10">
            
            <div 
                className="w-[75%] lg:w-[75%] text-center leading-15 text-[3vh] lg:text-[6.5vh] font-[font4] uppercase tracking-[-0.03em] font-extrabold  max-sm:leading-tight"
            >
                <AnimatedLine text={line1} />
                {/* <AnimatedLine text={line2} />
                <AnimatedLine text={line3} />
                <AnimatedLine text={line4} /> */}
            </div>

            <div>
            
            <img src={mySign} alt="My Signature" className="w-[12vw] h-[7vw] top-10 mt-50 mx-auto bg-transparent opacity-80 max-sm:w-[45vw] max-sm:h-auto max-sm:mt-12" />
            </div>
            
        </div>
    );
}

export default MyInfoTop;




// const line1 = "Shaping digital interfaces where design and code ";
// const line2 = "converge —precise, adaptive, and born from the void.";
// const line3 = "Each interaction a pulse of light redefining the digital experience.";