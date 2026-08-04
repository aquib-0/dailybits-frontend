import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const {register: reg} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  type formValue = {
      username: string,
      email: string,
      password: string,
      confirm_password: string,
    };
    const form = useForm<formValue>({
      defaultValues: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      }
    });
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;


    const onSubmit = async(data: formValue)=>{
      try{
        // console.log("OnSubmit funtion called");
        await reg(data);
        // console.log("Navigating to '/home'");
        
        navigate(from, {replace: true});
      } catch(error)
      {
        alert(error);
      }
    };

    return (
      <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-[80%] sm:w-[36%] h-[80vh] flex flex-col justify-center gap-y-5 px-8 bg-white absolute bottom-2">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              }
            })} />
            <p className="error">{errors.username?.message}</p>
          </div>
  
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              }
            })} />
            <p className="error">{errors.email?.message}</p>
          </div>
  
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              }
            })} />
            <p className="error">{errors.password?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password" id="confirm_password" {...register("confirm_password", {
              required: {
                value: true,
                message: "Please confirm your password",
              }
            })} />
            <p className="error">{errors.confirm_password?.message}</p>
          </div>

          <button className="submit-btn">Submit</button>

          <Link to="/auth/login" className="underline">Already have an account?</Link>
  
        </form>
      </div>
    )
}

export default RegisterForm
