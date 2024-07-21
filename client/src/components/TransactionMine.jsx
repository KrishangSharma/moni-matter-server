import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../design'

const TransactionsTwo = () => {
  const {register, handleSubmit, reset, formState: {errors} } = useForm()
  const [category, setCategory] = useState('income');
  const createTransaction = ()=>{
    //temporarily removed the logic part
  }

  //our defined categories for both income and expense for managing icons
  const incomeCategories = ['Salary', 'Business', 'Investments'];
  const expenseCategories = ['Rent', 'Groceries', 'Shopping'];

  return (
    <div className='w-full h-screen'>
      <div className='w-1/2 h-screen flex justify-center'>
      <form onSubmit={handleSubmit(createTransaction)}>
        <div className='flex flex-col gap-5 justify-center'>
      <div className='w-72 h-10 bg-gray-400 mt-24 flex'>
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
      </div>
      <input type="hidden" {...register('category')} value={category} />
      
      <Input 
        label = "Name"
        placeholder="Enter name"
          {...register("description", {
            })}
          /> 

      <Input 
        label = "Description"
        placeholder="Enter description"
          {...register("description", {
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

        <Input
        label = "Reciept"
        type = "file"
        accept="image/png, image/jpg, image/jpeg"
        {...register("receipt")}
        />

        <div className='mt-4'>
        <label htmlFor="categoryType" className='block mb-2'>Category:</label>
        <select id="categoryType" {...register('categoryType')} className='w-full p-2 border rounded'>
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

        <Button type="submit" bgColor='bg-violet-400' className='w-32'>
          Submit
        </Button>

        <div>What I think it should have</div>
      
        </div>
      </form>
      </div>

    </div>
  )
}

export default TransactionsTwo
