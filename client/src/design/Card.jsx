import React, {useState} from 'react'

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

        <section className='w-[80%] h-full px-3 bg-yellow-200 flex flex-col'>
            <header className={`flex items-center justify-center bg-red-200 h-[2rem]`}>
                <span className='w-1/2 '>{title}</span>
                <span className={`w-1/2 flex justify-end ${amountColor}`}>{Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
            </header>
            {description && (
                <article className={` text-sm items-center ${open? 'flex h-1/2' : 'hidden h-0'}`}>{description}</article>
            )}
            <footer className={`text-sm w-full   flex items-center bg-blue-200 h-[2rem]`}>{formatDate(date)}</footer>
        </section>

        <section className='w-[8%] text-sm flex flex-col justify-center'>
            <button className='w-full h-1/2 bg-zinc-600 flex items-center justify-center'>edit</button>
           {description && (
                <button className='w-full h-1/2 bg-slate-400 flex items-center justify-center' onClick={buttonHandler}>...</button>
           )} 
        </section>
        
    </div>
  )
}

export default Card