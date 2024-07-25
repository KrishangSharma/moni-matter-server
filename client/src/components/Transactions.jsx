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
        
        <div className='w-screen h-full flex flex-col bg-accent-100 items-center'>
        <div className='w-full h-16 bg-white'>Moni Matter</div>

      <section className='w-72 h-10 bg-gray-400 bottom-24 flex absolute'>
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
          {...register("name", {
            })}
          /> 
      
      <Input 
        label = "Amount"
        type = "number"
        placeholder="Enter amount"
          {...register("amount", {
              required: true,
            })}
          /> 
      </section>

      <section className='w-full h-20 px-6  text-sm flex items-center'>
      <Input 
        label = "Description"
        placeholder="Enter description"
          {...register("description", {
            })}
          /> 
      </section>

      <section className='w-full h-20  flex items-center justify-center gap-5 p-6 text-sm mb-5'>
        <div className='w-1/2'>
        <Input
        label = "Reciept"
        type = "file"
        accept="image/png, image/jpg, image/jpeg"
        {...register("receipt")}
        />
        </div>

        <div className='w-1/2'>
        <label htmlFor="categoryType" className='block mb-1'>Category:</label>
        <select id="categoryType" {...register('categoryType')} className='w-full p-[10px] border rounded-lg'>
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

        <Button type="submit" bgColor='bg-violet-400' className='w-32'>
          Submit
        </Button>
 
        
      
        </div>
      </form>
      </div>

   
  )
}

export default Transactions
