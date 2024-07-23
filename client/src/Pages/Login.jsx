import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input } from "../design/index";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  // Password was not being sent in the request
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

function Login() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });


  const login = async (data) => {
    const userinfo = {
      credential: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(
        `http://localhost:${import.meta.env.VITE_PORT}/user/login`,
        userinfo
      );
      console.log("Login successful");
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User does not exist! Please create an account first.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Incorrect password!");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      reset();
    }
  };

  return (

      <main className="w-full h-screen flex flex-col items-center justify-center">
        <header className="w-full h-24 mt-9 flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-semibold">Sign in</h1>
          <h1 className="text-xl">Login to get started.</h1>
        </header>
        <section className="w-10/12 lg:w-4/12 md:w-7/12 md:h-2/4 h-2/4 rounded-xl bg-secondary-50 mt-4 flex items-center justify-center lg:px-16">
          <form onSubmit={handleSubmit(login)} className="mt-5">
            <container className="flex flex-col gap-2 md:gap-3 items-center">
              <Input
                label="Email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                })}
              />{" "}
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className="w-2/4 mt-3 bg-secondary-500 text-white border border-secondary-500 hover:bg-secondary-600 cursor-pointer"
                disabled={!isValid}
              >
                Login
              </Button>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
              />
            </container>
            <div className="w-full flex justify-center items-center lg:mt-1">
              Don't have an account?{" "}
              <Link
              className="px-2 py-3 rounded-xl bg-transparent hover:text-primary-600"
              to="/signup"
              >
              Sign up
            </Link>
            </div>
          </form>
        </section>
      </main>
    
  );
}
export default Login;
