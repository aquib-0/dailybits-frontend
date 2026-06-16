import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const path = window.location.pathname;
  console.log(path);
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[url(/about_bg.jpg)]'>
      {
        path == "/auth/login"? (<LoginForm />) : (<RegisterForm />)
      }
    </div>
  )
}

export default AuthPage
