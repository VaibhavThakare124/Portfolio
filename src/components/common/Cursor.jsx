// src/components/Cursor.jsx
import React, { useEffect } from "react";
import gsap from "gsap";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const move = (e) => gsap.to(cursor, { 
      x: e.clientX, 
      y: e.clientY, 
      duration: 0.25 
    });
    
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return <div id="cursor" className="fixed w-5 h-5 rounded-full bg-white z-100 pointer-events-none" />;
}
