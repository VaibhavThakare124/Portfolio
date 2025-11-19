import React from 'react';
// import { div } from 'three/tsl';

const Home = () => {
  return (
    
    <div className='h-screen w-screen  mx-10'>
      
      <div className="h-screen w-screen flex flex-col justify-center  text-center">
      
          <div className="absolute top-0 left-0 w-full flex justify-center  z-50 pointer-events-none">
            <div className="text-[17vw] flex flex-row tracking-tighter uppercase font-bold font-[font1]  select-none leading-none bg-transparent">
              
              <h1>Vo</h1>
              <h1 className='rotate-270 text-[#c93b10]'>id</h1>
            </div>
            <h1 className="text-[17vw] uppercase font-bold font-[font1]  select-none leading-none bg-transparent">
              form
            </h1>
          </div>
          {/* Paragraph Section - make paragraph fixed and movable */}
          <div className=" absolute top-[40%] w-[35%] left-10 z-40">
            <p className="text-[#e0dbdb] text-[18px] font-[font2] text-left">
              Designed & Developed by <span>VAIBHAV THAKARE</span>  — Blending design, code, and motion into intuitive experiences.
            </p>
          </div>

      </div>

      <div className="relative flex flex-row justify-between items-end" style={{ position: "absolute", bottom: "5%", left: "2.5%", right: "2.5%", width: "95%" }}>
        <h1 className="ml-0 text-[20px] font-[font2]">Scroll To Explore</h1>

        <div className="flex flex-row gap-6">
          <h1 className='text-[18px]'>Creative Web Development</h1>
          <div className="bg-white w-0.5 h-8"></div>
          <h1 className='text-[18px]'>Animated Interfaces</h1>
          <div className="bg-white w-0.5 h-8"></div>
          <h1 className='text-[18px]'>Immersive 3D Experiences</h1>
        </div>
      </div>

    </div>


    
  );
  };

export default Home;