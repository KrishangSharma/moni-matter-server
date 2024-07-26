import React, {useState} from 'react'
import { ArrowDown } from '../assets/otherIcons/Icons';

const Card = ({
    title = "title",
    description = "",
    amount = 0,
    type = "income",
    date = "2024-01-01",
}) => {
  const [open, setOpen] = useState(false)

  const amountColor = type === 'expense' ? 'text-red-500' : 'text-green-500';

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  function buttonHandler(){
        setOpen(!open)
  }

  return (
    <div className={`w-full bg-gray-300 flex rounded ${description ? (open ? 'h-28' : 'h-16') : 'h-16'}`}>
        <section className='w-[12%] h-full bg-primary-100 flex items-center justify-center text-sm'>Icon</section>

        <section className='w-[70%] h-full px-3 flex flex-col'>
            <header className={`flex items-center justify-center h-[2rem] flex-nowrap`}>
                <span className='w-[60%] md:text-lg truncate'>{title}</span>
                <span className={`w-[40%] flex justify-end text-sm md:text-lg ${amountColor}`}>{Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
            </header>
            {description && (
                <article className={` text-sm items-center ${open? 'flex h-1/2' : 'hidden h-0'}`}>{description}</article>
            )}
            <footer className={`text-xs md:text-sm w-full h-[2rem] flex justify-between`}>
                <div className='w-1/2 h-full flex items-center'>
                {formatDate(date)}
                </div>
                {description && (
                <button className='w-1/5 h-full  flex items-center justify-center' onClick={buttonHandler}><ArrowDown className='w-5 h-5'/></button>
           )} 
            </footer>
        </section>

        <section className='w-[18%] text-sm flex flex-col justify-center bg-slate-400'>
            <button className={`w-full flex items-center bg-yellow-400 justify-center h-1/2`}>edit</button>
            <button className={`w-full flex items-center bg-red-400 justify-center h-1/2`}>del</button>
        </section>
        
    </div>
  )
}

export default Card