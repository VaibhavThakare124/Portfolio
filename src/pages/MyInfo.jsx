import React from 'react'
import MyInfoTop from '../components/myinfo/MyInfoTop'
import MyInfoBottom from '../components/myinfo/MyInfoBottom'

const MyInfo = () => {
  return (
    <div data-scroll-section className='h-full w-screen flex flex-col justify-center items-center mx-10'>
        <MyInfoTop data-scroll-section/>
        <MyInfoBottom/>
    </div>
  )
}

export default MyInfo