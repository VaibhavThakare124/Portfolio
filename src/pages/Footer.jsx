import React from 'react'

const Footer = () => {
  return (
    <div className='w-screen h-full flex items-center justify-center'>
      <div className='flex flex-row justify-center items-center gap-[120vh] p-10'>
        <div>
            <h1>Quick Links</h1>
            <div className='flex flex-row gap-10'>
               <ul className='flex flex-row gap-6'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Contact</li>
                </ul> 
            </div>
            
        </div>

        <div className='flex flex-col'>
            <h1 className='flex items-end right-0'>Networks</h1>
            <div className='flex flex-row gap-6'>
               <a href="https://www.linkedin.com/in/vaibhavthakare101">LinkedIn</a>
               <a href="https://x.com/IMxVaibhavT">X/Twitter</a>
               <a href="https://www.instagram.com/vaibhav_thakare_2.o/">Instagram</a>
               <a href="https://github.com/VaibhavThakare124">GitHub</a>
            </div>
            
        </div>

      </div>
    </div>
  )
}

export default Footer
