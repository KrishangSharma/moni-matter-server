import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Graph from '../design/Graph';


//dummy data for visualization
const Home = () => {

  const transactions = [
    { id: 1, description: 'Grocery', amount: -5000.00, type: 'expense', date: '2024-07-01' },
    { id: 2, description: 'Salary', amount: 200000.00, type: 'income', date: '2024-07-05' },
    { id: 3, description: 'Electric Bill', amount: -7500.00, type: 'expense', date: '2024-07-10' },
    { id: 4, description: 'Freelance Work', amount: 30000.00, type: 'income', date: '2024-07-15' },
  ];

  const getAmountClass = (type) => {
    return type === 'expense' ? 'text-red-500' : 'text-green-500';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
   
    <main className='hidden w-full h-screen overflow-hidden flex justify-center '>
      <section className='w-[90%] h-4/5 bg-accent-50 mt-[8.4rem] flex justify-between px-12'>

        <section className='w-2/5 h-full p-9  flex flex-col items-center justify-center gap-5'>
          <article className='w-full h-[25%] bg-secondary-300 rounded-lg p-5'>
            <span className='w-full h-[50%]'>
              <div>Balance</div>
            </span>
            <span className='w-full h-[50%] flex items-end justify-between'>
              <div>Income</div>
              <div>expense</div>
            </span>
          </article>

          <article className='w-full h-[15%] bg-white rounded-lg flex items-center justify-center'>
            <span>Budgeting system</span>
          </article>

          <article className='w-full h-[60%] bg-white rounded-lg p-4'>
              {transactions.map((transaction) => (
              <div key={transaction.id} className="p-2 border-b border-gray-300">
                <div className="flex justify-between">
                  <span>{transaction.description}</span>
                  <span className={getAmountClass(transaction.type)}>
                    {transaction.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </span>
                </div>
                <span className="block text-gray-500 text-sm">{formatDate(transaction.date)}</span>
              </div>
            ))}

          </article>

        </section>

        <section className='w-[55%] h-full p-9 bg-secondary-100 flex flex-col items-center justify-center gap-5'>
          <article className='w-full h-[15%] bg-slate-500 rounded-lg'>

          </article>
          <article className='w-full h-[85%] rounded-lg flex items-center justify-center bg-white'>
            <div className='w-full h-full mt-20'>
           <Graph transactions={transactions}/>
           </div>
          </article>
        </section>

      </section>
    </main>
   
  )
}

export default Home