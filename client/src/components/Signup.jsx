import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input} from "../design/index"
import { Link } from "react-router-dom";
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
            await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/user/new`, userinfo);
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
        
        <main className="w-full h-screen flex flex-col items-center justify-center">
            <header className="w-full h-24 mt-11 flex flex-col items-center justify-center gap-2">
                <h1 className="text-4xl font-semibold">Sign up</h1>
                <h1 className="text-xl">Create an account to get started.</h1>
            </header>

            <section className="w-10/11 h-3/5 rounded-xl mt-4 bg-secondary-50 flex items-start justify-center lg:px-16 lg:py-5 ">
                <form onSubmit={handleSubmit(create)} >
                    <container className="w-full h-full flex flex-col gap-2 md:gap-3 justify-center mt-3"> 
                        <section className="lg:flex lg:gap-4">
                            <div className="lg:w-1/2 lg:mb-2">
                                <Input
                                    label = "First Name"
                                    placeholder="Enter your first name"
                                    {...register("fName", {
                                        required: true,
                                    })}
                                /> {errors.fName && <p className="text-red-400">{errors.fName.message}</p>}
                            </div>
                            <div className="lg:w-1/2 lg:mb-2" >
                                <Input
                                    label = "Last Name"
                                    placeholder="Enter your last name"
                                    {...register("lName", {
                                        required: true,
                                    })}
                                /> {errors.lName && <p className="text-red-400">{errors.lName.message}</p>}
                            </div>
                        </section>

                        <section className="lg:flex lg:gap-4">
                            <div className="lg:w-1/2 lg:mb-2">
                                <Input
                                    label = "Email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: true,
                                    })}
                                /> {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                            </div>
                            <div className="lg:w-1/2 lg:mb-2">
                                <Input
                                    label = "Phone no"
                                    placeholder="Enter your phone number"
                                    {...register("tel", {
                                        required: true,
                                    })}
                                /> {errors.tel && <p className="text-red-400">{errors.tel.message}</p>}
                            </div>
                        </section>

                        <section className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-4">
                            <Input
                                label = "Password"
                                type = "password"
                                placeholder="Enter password"
                                {...register("password", {
                                    required: true,
                                })}
                            /> {errors.password && <p className="text-red-400">{errors.password.message}</p>}

                            {/*Custom button element*/}
                            <Button type="submit" className="w-2/4 mt-5 bg-secondary-500 text-white border border-secondary-500 hover:bg-secondary-600 cursor-pointer" disabled={!isValid}>
                                Create Account
                            </Button> 
                            <ToastContainer 
                            position="top-center"
                            autoClose={2000}
                            hideProgressBar={true}
                            />
                        </section>
            </container>
            <div className="w-full flex justify-center items-center lg:mt-1 ">Already have an account? 
            <Link
              className="px-2 py-3 rounded-xl bg-transparent hover:text-primary-600"
              to="/login"
            >
              Sign in
            </Link>
            </div>
        </form>
        
        </section>
        </main>
        
    )
}
export default Signup