import React from 'react'
import MyInfoTop from '../components/myinfo/MyInfoTop'
import MyInfoBottom from '../components/myinfo/MyInfoBottom'

const MyInfo = () => {
  return (
    <div className='h-full w-screen flex flex-col justify-center items-center mx-10'>
        <MyInfoTop/>
        <MyInfoBottom/>
    </div>
  )
}

export default MyInfo