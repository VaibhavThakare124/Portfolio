import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const IntegratedLoader = () => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const crosshairRef = useRef(null);
  const stairParentRef = useRef(null);
  const contentRef = useRef(null);

  // 1. Loader Logic (Counter & Crosshair)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Trigger the Stair Animation when counter reaches 100
          playStairTransition();
        }
      });

      tl.to({ val: 0 }, {
        val: 100,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function () {
          const currentVal = Math.floor(this.targets()[0].val);
          setProgress(currentVal);
          
          gsap.set(crosshairRef.current, {
            rotation: currentVal * 3.6,
            scale: 1 + currentVal / 200,
          });
        }
      });

      // Continuous rotation
      gsap.to(crosshairRef.current, {
        rotation: "+=360",
        duration: 2,
        repeat: -1,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  // 2. Stair Transition Logic
  const { contextSafe } = useGSAP({ scope: stairParentRef });

  const playStairTransition = contextSafe(() => {
    const tl = gsap.timeline();

    // Show stairs and animate them up
    tl.set(stairParentRef.current, { display: 'block' });
    
    tl.fromTo('.stair', 
      { height: 0 }, 
      { height: '100%', stagger: { amount: 0.3 }, ease: "expo.inOut" }
    );

    // Hide the loader background once stairs cover the screen
    tl.set(loaderRef.current, { display: 'none' });

    // Slide stairs down to reveal content
    tl.to('.stair', {
      y: '100%',
      stagger: { amount: 0.3 },
      ease: "expo.inOut",
      delay: 0.2
    });

    // Fade in the actual page content
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      "-=0.5"
    );

    tl.set(stairParentRef.current, { display: 'none' });
  });

  return (
    <>
      {/* 1. INITIAL LOADER OVERLAY */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black overflow-hidden select-none"
      >
        <div ref={crosshairRef} className="relative flex h-20 w-20 items-center justify-center mix-blend-difference">
          <div className="absolute h-[2px] w-full bg-white" />
          <div className="absolute h-full w-[2px] bg-white" />
        </div>

        <div className="absolute bottom-[4vh] left-[4vh] font-mono text-[14px] uppercase text-[#666]">
          System // Boot_Sequence
        </div>

        <div
          className="absolute -bottom-[2vw] right-[2vw] origin-bottom-right font-black leading-none text-white"
          style={{ 
            fontSize: '25vw', 
            fontFamily: '"Impact", sans-serif',
            letterSpacing: '-1rem'
          }}
        >
          {progress}
        </div>
      </div>

      {/* 2. STAIR TRANSITION LAYER */}
      <div ref={stairParentRef} className='h-screen w-full fixed z-110 top-0 left-0 hidden pointer-events-none'>
        <div className='h-full w-full flex'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='stair h-full w-1/5 bg-white'></div>
          ))}
        </div>
      </div>

      
    </>
  );
};

export default IntegratedLoader;