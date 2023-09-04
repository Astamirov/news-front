import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "../../features/authSlice";
import { AppDispatch, RootState } from "../../app/store";
import style from "./Login.module.css";
import { Link, useNavigate } from 'react-router-dom';



export const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state:RootState)=> state.auth.error) as string | null
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const token = useSelector((state: RootState) => state.auth.token)


  const handleSingIn =  (e: FormEvent) => {
    e.preventDefault();
    dispatch(authSignIn({_id: "", login, password}))
  };

  if (token) {
    navigate("/")
  }
  
  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

console.log(error)
  return (
    <div className={style.container}>

    <div className={style.form__signIn}>
      <h1 className={style.form__h1}>Login Form</h1>
      <form onSubmit={handleSingIn}>
        <h4 className={style.form__h4}>Username</h4>
        <input
          className={style.input}
          onChange={handleSetName}
          value={login}
          type="text"
          name=""
          id=""
        />
        <h4 className={style.form__h4}>Password</h4>
        <input className={style.input} onChange={handleSetPass} value={password} type="password" />
        {error ? <div className={style.error}>{error}</div> : null}
        <button>Login</button>
      </form>
      <p className={style.form__text}>Don`t have an account? <Link to='/auth'>Signup</Link></p>
    </div>
    </div>
  );
};
