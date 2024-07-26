import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../design'

const Transactions = () => {
  const {register, handleSubmit, reset, formState: {errors} } = useForm()
  const [category, setCategory] = useState('income');
  const createTransaction = ()=>{
    //temporarily removed the logic part
  }

  //our defined categories for both income and expense for managing icons
  const incomeCategories = ['Salary', 'Business', 'Investments'];
  const expenseCategories = ['Rent', 'Groceries', 'Shopping'];

  return (
    
      <div className='w-full h-screen flex justify-center'>
      <form onSubmit={handleSubmit(createTransaction)}>
        
        <div className='w-screen h-full flex flex-col items-center'>
        <div className='w-full h-14 bg-secondary-500 flex items-center px-8 text-white text-lg'>Transactions</div>

      <section className='w-72 h-10 bg-gray-400 top-20 md:bottom-24 flex absolute'>
        <div className={`w-1/2 h-full flex items-center justify-center ${category === 'income' ? 'bg-green-500' : 'bg-transparent'}`}
          onClick={() => setCategory('income')}>
        <button
            type="button"
            className={`w-full h-full ${category === 'income' ? 'text-black' : 'text-gray-700'}`}
          >
            Income
          </button>
        </div>
        <div className={`w-1/2 h-full flex items-center justify-center ${category === 'expense' ? 'bg-green-500' : 'bg-transparent'}`}
          onClick={() => setCategory('expense')}>
        <button
            type="button"
            className={`w-full h-full ${category === 'expense' ? 'text-black' : 'text-gray-700'}`}
          >
            Expense
          </button>
        </div>
      </section>


      <input type="hidden" {...register('category')} value={category} />
      
      <section className='w-full h-20  flex items-center justify-center gap-5 p-6 text-sm mt-2'>
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

      <section className='w-full h-20 px-6  text-sm flex items-center'>
      <Input 
        label = "Description"
        placeholder="Enter description"
         className= "focus:border-secondary-500"
          {...register("description", {
            })}
          /> 
      </section>

      <section className='w-full h-[6rem]  flex items-center justify-center gap-5 p-6 text-sm '>
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
      <section className='w-full h-20 px-6 gap-5 text-sm flex items-center'>
        <div className='w-1/2'>
        <Input
        type = "date"
        label = "Date"
        className= "focus:border-secondary-500"
        {...register("receipt")}
        />
        </div>
        <div className='w-1/2 flex items-center justify-center mt-6'>
        <Button type="submit" bgColor='bg-primary-500' className='w-full border-none text-white hover:bg-primary-600'>
          Submit
        </Button>
        </div>
        </section>
        <div className='w-full h-80 bg-white'></div>
        </div>
      </form>
      </div>

   
  )
}

export default Transactions
