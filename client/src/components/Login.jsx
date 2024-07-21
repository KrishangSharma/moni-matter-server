import React from "react";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input} from "../design/index"
import axios from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });



function Login(){
    const navigate = useNavigate()
    
    const {register, handleSubmit, reset, formState: { errors, isValid }} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
      });
    
    const buttonHandler = ()=>{
        navigate('/signup')
    }

    
    const login = async(data)=>{
        const userinfo = {
            credential : data.email,
            password : data.password
        }
        try {
            const response = await axios.post("http://localhost:3000/user/login", userinfo);
            console.log("Login successful");
                navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("User does not exist! Please create an account first.");
            }else if(error.response && error.response.status === 401){
                toast.error("Incorrect password!")
            }else {
                toast.error("An error occurred. Please try again later.");
            }
            reset();
        }

    }


    return(
        <div className="bg-[#0e4b32]">
        <div className="w-full h-screen flex flex-col items-center  bg-custom-radial-gradient2 bg-rad  text-white">
        <div className="w-screen h-[4.5rem] shadow-md text-2xl flex items-center justify-center ">
            <h1 className='w-44 p-1 flex items-center justify-center rounded-xl'>Moni Matter</h1>
        </div>
        <div className="w-full h-24 mt-7 flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-semibold">Sign in</h1>
            <h1 className="text-xl">Login to get started.</h1>
        </div>
        <div className="w-10/12 lg:w-4/12 md:w-7/12 md:h-2/4 h-2/4 rounded-xl mt-4 bg-white flex items-center justify-center lg:px-16 text-[#00804be8]">
        <form onSubmit={handleSubmit(login)} className="mt-5">
            <div className="flex flex-col gap-2 md:gap-3 items-center"> 

           <Input
            label = "Email"
            placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                    })}
            /> {errors.email && <p className="text-red-400">{errors.email.message}</p>}

            <Input
            label = "Password"
            type = "password"
            placeholder="Enter password"
                    {...register("password", {
                        required: true,
                    })}
            /> 

            <Button type="submit" className="w-2/4 mt-3 bg-violet-600 hover:bg-violet-700 cursor-pointer" disabled={!isValid}>
                        Login
            </Button> 
            <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}/>
            </div>
            <div className="w-full flex justify-center items-center lg:mt-1 font-semibold text-[green]">Don't have an account? <Button bgColor="" textColor = 'text-[green]' className="px-[5px] hover:text-[#ffbb00]" onClick={buttonHandler}>Sign up</Button></div>

        </form>
        
        </div>
        </div>
        </div>
    )
}
export default Login