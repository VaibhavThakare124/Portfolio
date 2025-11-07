import React, { useContext } from "react";
import { NavbarContext } from "../../context/NavContext";

const Navbar = () => {
  

  const [navOpen, setNavOpen] = useContext(NavbarContext);
  console.log(navOpen);

  return (
    <div className="absolute top-[40%] left-0 w-full z-10 flex items-center justify-center gap-[175vh] px-20 py-6">
      {/* Logo section */}
      <div className="text-3xl uppercase items-start flex flex-row font-[font1] font-semibold opacity-0">
        <span className='text-[#c93b10]'>void</span>from

        <div 
       
        className='top-0 left-0 flex items-start'><i className="text-[15px] ri-add-large-fill"></i></div>
          
      </div>

      {/* Hover icon */}
      <div 
       onClick={() => {
        setNavOpen(true)
        }}
      className="transition-transform duration-300 hover:rotate-90 cursor-pointer">
        <i className="text-4xl ri-add-large-fill"></i>
      </div>
    </div>
  );
};

export default Navbar;
