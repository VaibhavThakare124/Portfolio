import React, { useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import myImg from '../../assets/myImg1.png';
import AnimatedLine from '../common/AnimatedLine';

gsap.registerPlugin(ScrollTrigger);

const MyInfoBottom = () => {

    const line1 = "Hey, I’m Vaibhav Thakare — an architect of the digital void. I bridge the gap between static design and kinetic code, crafting immersive interfaces shaped by motion and intent.";
    // const line2 = "where motion, light, and interaction converge. Each line of code is a fragment of";
    // const line3 = "form shaped with intent.";

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
            ScrollTrigger.matchMedia({

                
                "(min-width: 769px)": () => {
                  gsap.to(textContainer, {
                    scale: 0.8,
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                      trigger: textContainer,
                      start: "top 15%",
                      end: "bottom top",
                      scrub: 1.5,
                      pin: true,
                      anticipatePin: 1,
                      // markers: true,
                    },
                  });
                },
              
                
                "(max-width: 768px)": () => {
                  gsap.to(textContainer, {
                    yPercent: -8,          
                    ease: "none",
                    scrollTrigger: {
                      trigger: textContainer,
                      start: "top 50%",
                      end: "+=200",        
                      scrub: 0.5,
                      pin: true,
                      anticipatePin: 1,
                      pinSpacing: true,
                    //   markers: true,
                    },
                  });
                },
              
              });
              
        }

        // Animate image container with smoother effect
        ScrollTrigger.matchMedia({
            "(min-width: 769px)": () => {
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
            },
            "(max-width: 768px)": () => {
                gsap.fromTo('.image-container', 
                    { 
                        // y: 100,      
                        // opacity: 1,
                        // scale: 0.95,
                        // filter: "blur(10px)"
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        scrollTrigger: {
                            trigger: '.image-container',
                            start: 'top 20%', 
                            end: 'top 40%',   
                            scrub: 1.5,     
                            // markers: true,
                        }
                    }
                );
            }
        })
        

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
                ScrollTrigger.matchMedia({
                    "(min-width: 769px)": () => {
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
                    },

                    "(max-width: 768px)": () => {
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
                                    start: 'top 99%',
                                    end: 'top 95%',
                                    scrub: 1,
                                    // markers: true,
                                }
                            }
                        );
                    }

                });
                
            }
        }
    }, { scope: containerRef });

    return (
        
        <div 
        data-scroll-section
        ref={containerRef} className='w-screen justify-between items-center'>
            
            
            <div className="top-[10vh] h-full w-screen overflow-hidden flex flex-col gap-[5vh] justify-between items-center relative py-[10vh] px-4 sm:px-8">
                
                <div className='text-container flex flex-col items-center justify-center uppercase font-extrabold leading-10 pointer-events-none text-center gap-1'>
                    <h1 className='text-[5vh] lg:text-[11vh] tracking-[-0.03em] font-[font4] leading-none '>Behind the</h1>
                    <h1 className='text-[10vh] lg:text-[20vh] tracking-[-0.03em] font-[font4] leading-none '>Screen</h1>
                </div>

                
                <div className='image-container flex flex-col items-center justify-center w-full relative gap-22 max-sm:gap-16'>
                    <div className='w-[28vw] h-[40vw] rounded-2xl overflow-hidden max-sm:w-[75vw] max-sm:h-[90vw]'>
                        <img src={myImg} alt="My Image" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className='info-text-container w-full text-center flex flex-col items-center gap-6 mt-16 max-sm:w-[90%]'>
                        <div className='text-[4vh] w-[74%] leading-7 font-light flex flex-col font-[font4] uppercase max-sm:text-[4.5vw]'>
                            <AnimatedLine text={line1} />
                            {/* <AnimatedLine text={line2} />
                            <AnimatedLine text={line3} /> */}
                        </div>
                        <p className='text-lg md:text-xl font-[font4] w-[60%] text-center text-[#808080] font-light leading-6 max-sm:w-full max-sm:text-base'>
                            I build digital forms that adapt, respond, and evolve — precision-engineered to make interaction feel intuitive, fluid, and human. Every motion and detail reflects a living digital consciousness — designed to flow, react, and evolve beyond static design.
                        </p>
                        <div className='mt-4'>
                            <button className='bg-white w-[35vh] h-[8vh] text-black px-8 py-3 rounded-full font-extrabold pointer-events-auto hover:bg-opacity-80 transition-colors uppercase font-[font1] text-[3vh] tracking-[-0.03em] max-sm:w-[70vw] max-sm:h-[7vh] max-sm:text-lg'>
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