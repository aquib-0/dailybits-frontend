import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export type formValue = {
    email: string,
    password: string
  };
const LoginForm = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const form = useForm<formValue>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const {register, handleSubmit, formState} = form;
  const {errors} = formState;

  const onSubmit = async(data: formValue)=>{
    try{
      // console.log(data);
      await login(data);

      navigate('/home');
    } catch(error)
    {
      alert(error);
    }
  
  };

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-[80%] sm:w-[30%] flex flex-col">

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

        <button className="submit-btn">Submit</button>

      </form>
    </div>
  )
}

export default LoginForm
