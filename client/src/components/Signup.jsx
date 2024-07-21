import React from "react";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input} from "../design/index"
import axios from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//zod for form validation
const schema = z.object({
    fName: z.string().min(2, "Name must be at least 2 characters").max(20),
    lName: z.string().min(2, "Name must be at least 2 characters").max(20),
    email: z.string().email({ message: "Invalid email address" }),
    tel: z.string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must only contain digits"),
    password: z.string().min(6, "Password must be at least 6 characters").max(20)
  });



function Signup(){
    const navigate = useNavigate()
    
    //extracting from react hook form
    const {register, handleSubmit, reset, formState: { errors, isValid }} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
      });
    
    

    const buttonHandler = ()=>{
        navigate('/login')
    }

    //adding data from the form into a object to be send on backend
    const create = async(data)=>{
        const userinfo = {
            fName : data.fName, 
            lName : data.lName, 
            email : data.email,
            tel : data.tel, 
            password : data.password
        }
        try {
            await axios.post("http://localhost:3000/user/new", userinfo);
            console.log("sign up successful");
            toast.success("Sign up successful");
            //added setTimeout because it was immediately naviagting to login and toast didn't look good
            setTimeout(() => {
                navigate('/login');
                   }, 2000); 
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("User with these credentials already exists!");
            } else {
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
            <h1 className="text-4xl font-semibold">Sign up</h1>
            <h1 className="text-xl">Create an account to get started.</h1>
        </div>
        <div className="w-10/12 lg:w-5/12 md:w-7/12 md:h-4/6 h-5/6 rounded-xl mt-4 bg-white flex items-center justify-center lg:px-16 text-[#00804be8]">
        <form onSubmit={handleSubmit(create)} className="mt-5">
            <div className="flex flex-col gap-2 md:gap-3 items-center"> 
            <div className="lg:flex lg:gap-4">
            <div className="lg:flex lg:flex-col lg:mb-1 lg:w-1/2 mb-2">
            {/*custom input element, can be found on design folder */}
            <Input
            label = "First Name"
            placeholder="Enter your first name"
                    {...register("fName", {
                        required: true,
                    })}
            /> {errors.fName && <p className="text-red-400">{errors.fName.message}</p>}
            </div>
            <div className="lg:flex lg:flex-col lg:w-1/2 ">
            <Input
            label = "Last Name"
            placeholder="Enter your last name"
                    {...register("lName", {
                        required: true,
                    })}
            /> {errors.lName && <p className="text-red-400">{errors.lName.message}</p>}
            </div>
            </div>

           <Input
            label = "Email"
            placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                    })}
            /> {errors.email && <p className="text-red-400">{errors.email.message}</p>}

            <Input
            label = "Phone no"
            placeholder="Enter your phone number"
                    {...register("tel", {
                        required: true,
                    })}
            /> {errors.tel && <p className="text-red-400">{errors.tel.message}</p>}

            <Input
            label = "Password"
            type = "password"
            placeholder="Enter password"
                    {...register("password", {
                        required: true,
                    })}
            /> {errors.password && <p className="text-red-400">{errors.password.message}</p>}

            {/*Custom button element*/}
            <Button type="submit" className="w-2/4 mt-3 bg-violet-600 hover:bg-violet-700 cursor-pointer" disabled={!isValid}>
                        Create Account
            </Button> 
            <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            />
            </div>
            <div className="w-full flex justify-center items-center lg:mt-1 font-semibold text-[green]">Already have an account? <Button bgColor="" textColor = 'text-[green]' className="px-1 hover:text-[#ffbb00]" onClick={buttonHandler}>Sign in</Button></div>

        </form>
        
        </div>
        </div>
        </div>
    )
}
export default Signup