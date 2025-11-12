import React, { useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import myImg from '../../assets/myImg1.png';
import AnimatedLine from '../common/AnimatedLine';

gsap.registerPlugin(ScrollTrigger);

const MyInfoBottom = () => {

    const line1 = "Hey, I’m Vaibhav Thakare — designing within the void";
    const line2 = "where motion, light, and interaction converge. Each line of code is a fragment of";
    const line3 = "form shaped with intent.";

    const containerRef = useRef(null);

    useGSAP(() => {
        
        gsap.to('.text-container', {
            scale: 0.8,    
            yPercent: -20, 
            opacity: 1,    
            scrollTrigger: {
                trigger: '.text-container',
                start: 'top 15%', 
                end: 'bottom top',
                scrub: 1,      
                pin: true,
                // markers: true,
                
            }
        });

        
        gsap.from('.image-container', {
            y: 200,      
            opacity: 0,  
            scrollTrigger: {
                trigger: '.image-container',
                start: 'top 85%', 
                end: 'top 50%',   
                scrub: 1.5,     
            }
        });

    }, { scope: containerRef });

    return (
        
        <div ref={containerRef} className='w-screen justify-between items-center'>
            
            
            <div className="top-[10vh] h-full w-screen overflow-hidden flex flex-col gap-[10vh] justify-between items-center relative py-[10vh]">
                
                <div className='text-container flex flex-col items-center justify-center uppercase font-extrabold leading-22 pointer-events-none'>
                    <h1 className='text-[11vh] tracking-[-0.03em] font-[font4]'>Behind the</h1>
                    <h1 className='text-[20vh] tracking-[-0.03em] font-[font4]'>Screen</h1>
                </div>

                
                <div className='image-container flex flex-col items-center justify-center w-full relative gap-22'>
                    <div className='w-[28vw] h-[40vw] rounded-2xl overflow-hidden'>
                        <img src={myImg} alt="My Image" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className='info-text-container w-full text-center flex flex-col items-center gap-6 mt-16'>
                        <div className='text-[4vh] leading-7 font-light flex flex-col font-[font4] uppercase'>
                            {/* <h1><span className=''>Hey, I’m Vaibhav Thakare</span> — designing within the void</h1>
                            <h1>where motion, light, and interaction converge. Each line of code is a fragment of</h1>
                            <h1>form shaped with intent.</h1> */}

                            <AnimatedLine text={line1} />
                            <AnimatedLine text={line2} />
                            <AnimatedLine text={line3} />
                        </div>
                        <p className='text-lg md:text-xl font-[font4] w-[60%] text-center text-[#808080] font-light leading-6'>
                            I build digital forms that adapt, respond, and evolve — precision-engineered to make interaction feel intuitive, fluid, and human. Every motion and detail reflects a living digital consciousness — designed to flow, react, and evolve beyond static design.
                        </p>
                        <div className='mt-4'>
                            <button className='bg-white w-[35vh] h-[8vh] text-black px-8 py-3 rounded-full font-extrabold pointer-events-auto hover:bg-opacity-80 transition-colors uppercase font-[font1] text-[3vh] tracking-[-0.03em]'>
                                Download Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyInfoBottom;