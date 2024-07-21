import React from 'react'
import {Link, NavLink} from 'react-router-dom'


//temporarily removed all the logic part and styling, not responsive yet
const Home = () => {
  return (
    <div className='flex flex-col overflow-hidden'>
    <div className='w-full h-screen overflow-hidden flex justify-center '>
    <div className='w-2/5 h-screen  pt-24 px-10 flex flex-col gap-5'>
    <div className='w-full h-48 rounded-lg  flex p-5 bg-slate-300'> {/*bg-gradient-home */}
      <div className='w-1/2 flex flex-col items-start justify-between'>
      <h1>Balance</h1>
      <h1>Income</h1>
      </div> 
      <div className='w-1/2 flex items-end justify-end'>
      <h1>Expenses</h1></div>
    </div>
    <div className='w-full h-28 rounded-lg bg-slate-300'></div>
    <div className='w-full h-72 rounded-lg bg-slate-300'></div>
    </div>
    <div className='w-3/5 h-screen pt-24 px-10 flex flex-col gap-5'>
    <div className='w-full h-[4.5rem] bg-slate-300 rounded-lg mr-5'>
    </div>
    <div className='w-full h-[34rem] bg-slate-300 rounded-lg mr-5'>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Home