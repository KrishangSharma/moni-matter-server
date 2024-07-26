import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Card } from '../design'


const Transactions = () => {
  const {register, handleSubmit, reset, formState: {errors} } = useForm()
  const [category, setCategory] = useState('income');
  const createTransaction = ()=>{
    //temporarily removed the logic part
  }

  //our defined categories for both income and expense for managing icons
  const incomeCategories = ['Salary', 'Business', 'Investments'];
  const expenseCategories = ['Rent', 'Groceries', 'Shopping'];

  //dumy data
  const cards = [
    {
        title: "Salary",
        description: "Monthly salary for June",
        amount: 50000,
        type: "income",
        date: "2024-06-30"
    },
    {
        title: "Rent",
        description: null,
        amount: 15000,
        type: "expense",
        date: "2024-06-01"
    },
    {
        title: "Freelance Project",
        description: "Payment for freelance web development project",
        amount: 20000,
        type: "income",
        date: "2024-06-15"
    },
    {
      title: "Hospital bill",
      description: "Paid bill for the treatment of injury",
      amount: 4000,
      type: "expense",
      date: "2024-05-15"
     },
     {
      title: "Comission",
      description: "",
      amount: 10000,
      type: "income",
      date: "2024-06-20"
     },
  ]

  return (
    
      <div className='w-full h-[calc(100vh-4.5rem)] lg:h-screen flex justify-center lg:px-20 overflow-x-hidden'>

      <span className='w-full h-full lg:h-4/5 lg:mt-[6.4rem] flex flex-col lg:flex-row '>
      {/*Header for small devices */}
       <header className='title w-full h-12 flex flex-shrink-0 items-center px-10 bg-secondary-50 lg:hidden'>Transactions</header>
        
        {/*Form section */}
       <section className='form w-full lg:w-[48%] h-2/3 lg:h-full flex-shrink-0 rounded-lg px-8 lg:px-8'>
          <form onSubmit={handleSubmit(createTransaction)} className='mt-12 flex flex-col justify-center items-center '> 
              
              {/*expense toggle*/}
                <header className='w-72 h-10 bg-gray-400 flex '>
                  <div className={`w-1/2 h-full flex items-center justify-center ${category === 'income' ? 'bg-green-500' : 'bg-transparent'}`}
                  onClick={() => setCategory('income')}>
                    <button
                      type="button"
                      className={`w-full h-full ${category === 'income' ? 'text-white' : 'text-gray-700'}`}
                    >
                      Income
                    </button>
                  </div>
                  <div className={`w-1/2 h-full flex items-center justify-center ${category === 'expense' ? 'bg-red-500' : 'bg-transparent'}`}
                  onClick={() => setCategory('expense')}>
                    <button
                    type="button"
                    className={`w-full h-full ${category === 'expense' ? 'text-white' : 'text-gray-700'}`}
                    >
                      Expense
                    </button>
                  </div>
                </header>
              <input type="hidden" {...register('category')} value={category} />


              {/**other inputs */}
              <section className='w-full h-20  flex items-center justify-center gap-5 p-6 text-sm lg:text-base mt-2 lg:mt-4'>
                  <Input 
                    label = "Name"
                    placeholder="Enter name"
                    className= "focus:border-secondary-500"
                      {...register("name", {
                        })}
                      /> 
                  
                  <Input 
                    label = "Amount"
                    type = "number"
                    placeholder="Enter amount"
                    className= "focus:border-secondary-500"
                      {...register("amount", {
                          required: true,
                        })}
                      /> 
                  </section>

                  <section className='w-full h-20 px-6 flex items-center text-sm lg:text-base  lg:mt-4'>
                    <Input 
                      label = "Description"
                      placeholder="Enter description"
                      className= "focus:border-secondary-500"
                        {...register("description", {
                          })}
                        /> 
                  </section>

                  <section className='w-full h-[6rem]  flex items-center justify-center gap-5 p-6 text-sm lg:text-base  lg:mt-4'>
                    <div className='w-1/2'>
                      <Input
                      label = "Reciept"
                      type = "file"
                      accept="image/png, image/jpg, image/jpeg"
                      className= "focus:border-secondary-500"
                      {...register("receipt")}
                      />
                    </div>

                    <div className='w-1/2'>
                      <label htmlFor="categoryType" className='block mb-1'>Category:</label>
                      <select id="categoryType" {...register('categoryType')} className='w-full p-[10px] border rounded-lg focus:border-secondary-500'>
                        {category === 'income'
                          ? incomeCategories.map((incomeCategory, index) => (
                              <option key={index} value={incomeCategory}>{incomeCategory}</option>
                            ))
                          : expenseCategories.map((expenseCategory, index) => (
                              <option key={index} value={expenseCategory}>{expenseCategory}</option>
                            ))
                        }
                      </select>
                  </div>
                  </section>

                  <section className='w-full h-20 px-6 gap-5 flex items-center text-sm lg:text-base  lg:mt-4'>
                    <div className='w-1/2'>
                      <Input
                      type = "date"
                      label = "Date"
                      className= "focus:border-secondary-500"
                      {...register("receipt")}
                      />
                    </div>
                    <div className='w-1/2 flex items-center justify-center mt-6'>
                      <Button type="submit" bgColor='bg-primary-500' className='w-full h-10 border-none text-white hover:bg-primary-600'>
                        Submit
                      </Button>
                    </div>
                  </section>
        
        
          
          </form>
        </section>
        
         {/*Recent transactions list section */}
         <section className='list w-full lg:w-[54%] h-full px-12 p-10 rounded-lg flex-shrink-0'>
          <h1 className='mb-3 text-2xl'>Recent Transactions</h1>
          <div className='flex flex-col gap-6'>
          {cards.map((card, index) => (
                <Card
                    key={index} 
                    title={card.title}
                    description={card.description || ""} 
                    amount={card.amount}
                    type={card.type}
                    date={card.date}
                />
            ))}
            </div>
        </section>
         
        
        

      </span>
      </div>

   
  )
}

export default Transactions
