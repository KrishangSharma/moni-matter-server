import React from 'react'
import { BackgroundCircles } from '../design/Circles'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    const buttonHandler = ()=>{
        navigate('/signup')
    }
  return (
    <div className='relative w-full h-screen overflow-hidden bg-[#082d2e]'>
        <div className='w-full h-screen absolute bg-custom-radial-gradient flex z-0 item-center justify-center'>
            <div className='absolute top-[70%] opacity-30'><BackgroundCircles/></div>
        </div>
    <div className='flex flex-col relative z-20'>
        <div className="w-screen h-[4.5rem] shadow-md text-2xl flex items-center justify-center text-[white]">
            <h1 className='w-44 p-1 bg-custom-gradient flex items-center justify-center rounded-xl'>Moni Matter</h1>
        </div>
        <div className='lg:flex lg:justify-center lg:items-center'>
        <div className='w-full lg:w-9/12 flex flex-col text-center mt-16 p-10 gap-4 items-center justify-center'>
            <h1 className='text-5xl text-white lg:text-7xl md:text-6xl'>Moni Matter. Your Ultimate Finance Companion.</h1>
            <h2 className= 'text-xl lg:text-2xl lg:w-2/3 md:text-2xl text-gray-200/85'>Master your finances effortlessly with our intuitive expense management app.</h2>
            <button className= 'mt-5 w-32 h-9 rounded-xl border border-white hover:bg-custom-gradient bg-white font-semibold hover:text-[green]' onClick={buttonHandler}>Get started</button>
        </div>
        </div>
    </div>
   <img src='/moneyThree.png' alt='money' width={300} className='absolute top-[50%] left-[25%] md:top-[55%] md:left-[30%] lg:left-[38%] xl:top-[65%] xl:left-[40%] opacity-35'/>
  </div>
  )
}

export default Landing