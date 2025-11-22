import React, { useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import myImg from '../../assets/myImg1.png';
import AnimatedLine from '../common/AnimatedLine';
import { tr } from 'framer-motion/client';

gsap.registerPlugin(ScrollTrigger);

const MyInfoBottom = () => {

    const line1 = "Hey, I’m Vaibhav Thakare — designing within the void";
    const line2 = "where motion, light, and interaction converge. Each line of code is a fragment of";
    const line3 = "form shaped with intent.";

    const containerRef = useRef(null);

    useGSAP(() => {
        // Animate "Behind the Screen" text with smoother animation
        const textContainer = containerRef.current?.querySelector('.text-container');
        if (textContainer) {
            const headings = textContainer.querySelectorAll('h1');
            gsap.fromTo(headings,
                { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: textContainer,
                        start: 'top 80%',
                        end: 'top 60%',
                        scrub: 1.5,
                    }
                }
            );

            // Pin and scale animation
            gsap.to(textContainer, {
                scale: 0.8,    
                yPercent: -20, 
                scrollTrigger: {
                    trigger: textContainer,
                    start: 'top 15%', 
                    end: 'bottom top',
                    scrub: 1.5,      
                    pin: true,
                }
            });
        }

        // Animate image container with smoother effect
        gsap.fromTo('.image-container', 
            { 
                y: 200,      
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)"
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                scrollTrigger: {
                    trigger: '.image-container',
                    start: 'top 85%', 
                    end: 'top 50%',   
                    scrub: 1.5,     
                   
                }
            }
        );

        // Animate info text and button
        const infoText = containerRef.current?.querySelector('.info-text-container');
        if (infoText) {
            const paragraph = infoText.querySelector('p');
            const button = infoText.querySelector('button');
            
            if (paragraph) {
                gsap.fromTo(paragraph,
                    { opacity: 0, y: 30, filter: "blur(5px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: paragraph,
                            start: 'top 85%',
                            end: 'top 70%',
                            scrub: 1,
                            // markers: true,
                        }
                    }
                );
            }

            if (button) {
                gsap.fromTo(button,
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: button,
                            start: 'top 90%',
                            end: 'top 80%',
                            scrub: 1,
                        }
                    }
                );
            }
        }
    }, { scope: containerRef });

    return (
        
        <div 
        data-scroll-section
        ref={containerRef} className='w-screen justify-between items-center'>
            
            
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