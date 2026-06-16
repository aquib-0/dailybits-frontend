import { useForm } from "react-hook-form";

const RegisterForm = () => {
  type formValue = {
      username: String,
      email: String,
      password: String,
      confirm_password: String,
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
    const onSubmit = (data: formValue)=>{
      console.log(data);
    }
    return (
      <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-[80%] sm:w-[30%] flex flex-col">
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
  
        </form>
      </div>
    )
}

export default RegisterForm
