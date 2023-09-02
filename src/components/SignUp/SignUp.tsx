import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../../features/types"
import { AppDispatch, RootState } from "../../app/store";
import style from "./SignUp.module.css";
import { Link } from 'react-router-dom'



export const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state:RootState)=> state.application.error)as string | null
  const dispatch = useDispatch<AppDispatch>()
  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    setLogin("");
    setPassword("");
    dispatch(authSignUp({_id: "", login, password}))
  };

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if(error){
    return <div>{error}</div>
  }
  return (
    <div className={style.container}>

    <div className={style.form__signUp}>
      <h1 className={style.form__h1}>SignUp Form</h1>
      <form onSubmit={handleSignUp}>
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
        <button type='submit'>SingUp</button>
      </form>
      <p className={style.form__text}>Have an account? <Link to='/login'>Login</Link></p>
    </div>
    </div>
  );
};
