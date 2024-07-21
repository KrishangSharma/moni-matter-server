import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../design'
import TransactionsTwo from './TransactionMine'

const Transactions = () => {
  const {register, handleSubmit, reset, formState: {errors} } = useForm()
  const [category, setCategory] = useState('income');
  const createTransaction = ()=>{
    //temporarily removed the logic part
  }
  return (
    <div className='w-full h-screen flex'>
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
        label = "Description"
        placeholder="Enter description"
          {...register("description", {
            })}
          /> 
      
      <Input 
        label = "Amount"
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

        <Button type="submit" bgColor='bg-violet-400' className='w-32'>
          Submit
        </Button>

        <div>What we have right now</div>
      
        </div>
      </form>
      </div>
      <div className='w-1/2 h-screen flex justify-center'>
        <TransactionsTwo/>
      </div>

    </div>
  )
}

export default Transactions
